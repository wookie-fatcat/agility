/*

 ----------------------------------------------------------------------------
 | Agility: Solar Battery Optimisation against Octopus Agile Tariff          |
 |           specifically for Solis Inverters                                |
 |                                                                           |
 | Copyright (c) 2024-25 MGateway Ltd,                                       |
 | Redhill, Surrey UK.                                                       |
 | All rights reserved.                                                      |
 |                                                                           |
 | https://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                                |
 |                                                                           |
 |                                                                           |
 | Licensed under the Apache License, Version 2.0 (the "License");           |
 | you may not use this file except in compliance with the License.          |
 | You may obtain a copy of the License at                                   |
 |                                                                           |
 |     http://www.apache.org/licenses/LICENSE-2.0                            |
 |                                                                           |
 | Unless required by applicable law or agreed to in writing, software       |
 | distributed under the License is distributed on an "AS IS" BASIS,         |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  |
 | See the License for the specific language governing permissions and       |
 |  limitations under the License.                                           |
 ----------------------------------------------------------------------------

 9 January 2025

 */


class Battery {

  constructor(agility) {
    this.config = agility.config.$('battery');
    this.logger = agility.logger;
    this.date = agility.date;
    this.solis = agility.solis;
    if (agility.useSolcast) this.solcast = agility.solcast;
    this.octopus = agility.octopus;
    this.control = agility.control;
    this.agility = agility;
    let glsdb = agility.glsdb;
    this.chargeHistory = new glsdb.node('agilityChargeHistory');
    this.noOfChargeRecordsToKeep = 100;
  }

  get isConfigured() {
    if (!this.config.exists) return false;
    if (!this.config.$('storage').exists) return false;
    return true;
  }

  get levelNow() {
    return this.solis.batteryLevelNow;
  }

  get chargeLimit() {
    if (this.config.$('chargeLimit').exists) return 95;
    return +this.config.$('chargeLimit').value;
  }

  set chargeLimit(value) {
    this.config.$('chargeLimit').value = value;
  }

  isDischargeControlFlagSet() {
    return this.control.$('discharge').exists;
  }

  setDischargeControlFlag() {
    this.control.$('discharge').value = true;
  }

  unsetDischargeControlFlag() {
    this.control.$('discharge').delete();
  }

  get percentIncreasePerCharge() {
    if (this.chargeHistory.exists) {
      // calculate average from history
      let _this = this;
      let total = 0;
      let count = 0;
      this.chargeHistory.forEachChildNode(function(timeNode) {
        let data = timeNode.document;
        let start = +data.start;
        let end = +data.end;
        let startMinute = data.startMinute || 0;
        startMinute = +startMinute;
        if (startMinute > 29) {
          startMinute = startMinute - 30;
        }
        if (start < end && start < _this.chargeLimit) {
          let increase = end - start;
          if (startMinute === 0) {
            total += increase;
          }
          else {
            // scale up increase to what it would have been for 30 minutes
            increase = (increase / (30 - startMinute)) * 30;
            total += increase;
          }
          count++;
        }
      });
      if (total !== 0 && count !== 0) {
        console.log('total: ' + total + '; count: ' + count);
        let ave = total / count;
        console.log('average charge history value: ' + ave.toFixed(2));
        return ave;
      }
    }
    if (this.config.$('defaultPercentIncreasePerCharge').exists) {
      return +this.config.$('defaultPercentIncreasePerCharge').value;
    }
    else {
      return 6;
    }
  }

  startNewChargeHistoryRecord() {
    let d = this.date.now();
    if (this.levelNow) {
      this.chargeHistory.$([d.slotTimeIndex, 'start']).value = this.levelNow;
      this.chargeHistory.$([d.slotTimeIndex, 'startMinute']).value = d.minute;
    }
  }

  endChargeHistoryRecord() {
    let d = this.date.now();
    if (this.levelNow) {
      if (this.chargeHistory.$(d.previousSlotTimeIndex).exists) {
        this.chargeHistory.$([d.previousSlotTimeIndex, 'end']).value = this.levelNow;
      }
    }
  }

  get totalStorage() {
    return +this.config.$('storage').value;
  }

  set totalStorage(value) {
    this.config.$('storage').value = value;
  }

  get minimumLevel() {
    if (this.config.$('minimumnLevel').exists) return 20;
    return +this.config.$('minimumLevel').value;
  }

  set minimumLevel(value) {
    this.config.$('minimumnLevel').value = value;
  }

  netPowerBetween(fromTimeText, toTimeText) {

    this.logger.write('Calculating expected power between ' + fromTimeText + ' and ' + toTimeText);
    let averageExpectedPower;

    if (this.octopus.tomorrowsTariffsAvailable) {
      this.logger.write('Tomorrows octopus tariff available so get power till ' + toTimeText + ' tomorrow');
      // first get expected power from now until 23:30
      let power1 = this.solis.averagePowerBetween(fromTimeText, '23:30');
      this.logger.write('Expected power from ' + fromTimeText + ' until 23:30:');
      this.logger.write(JSON.stringify(power1));
      // then get expected power from midnight until specified to time
      let power2 = this.solis.averagePowerBetween('00:00', toTimeText);
      this.logger.write('Expected power from midnight until ' + toTimeText + ':');
      this.logger.write(JSON.stringify(power2));
      averageExpectedPower = {
        load: (+power1.load + +power2.load).toFixed(2),
        pv: (+power1.pv + +power2.pv).toFixed(2),
      }
    }
    else {
      averageExpectedPower = this.solis.averagePowerBetween(fromTimeText, toTimeText);
    }
    this.logger.write('Expected power use between ' + fromTimeText + ' and ' + toTimeText + ': ')
    this.logger.write(JSON.stringify(averageExpectedPower));
    let pv = averageExpectedPower.pv;
    if (this.agility.useSolcast) {
      let spv = this.solcast.expectedPowerBetween(fromTimeText, toTimeText);
      if (spv > 0) pv = spv;
    }
    let netPower = averageExpectedPower.load - pv;
    return netPower;
  }

  powerFromPercentage(percent) {
    return this.totalStorage * (percent / 100);
  }

  availablePowerFromPercentage(percent) {
    let availablePercentage = percent - this.minimumLevel;
    return this.powerFromPercentage(availablePercentage);
  }

  get availablePowerNow() {
    if (this.levelNow) {
      console.log('battery level now: ' + this.levelNow);
      return +this.availablePowerFromPercentage(this.levelNow);
    }
    console.log('Battery Level unable to be calculated');
    return;
  }

  noOfSlotsToChargeBy(deficit) {
    let increasePerCharge = this.percentIncreasePerCharge;
    console.log('Each charge will increase battery percentage by ' + increasePerCharge);
    let powerAddedPerCharge =  this.powerFromPercentage(increasePerCharge);
    console.log('power added per charge: ' + powerAddedPerCharge.toFixed(2));
    let noOfSlots = Math.round(deficit / powerAddedPerCharge);
    console.log('no of slots needed for deficit of ' + deficit + ': ' + noOfSlots);
    return noOfSlots;
  }

  get noOfSlotsNeeded() {
    let powerNeeded = this.netPowerBetween(this.date.now().slotTimeText, '22:30');
    this.logger.write('Net power needed between now and 22:30: ' + powerNeeded.toFixed(2));
    let batteryLevel = this.levelNow;
    if (!batteryLevel) return;
    this.logger.write('Battery level is currently ' + batteryLevel + '%');
    let availableBatteryPower = this.availablePowerFromPercentage(batteryLevel);
    this.logger.write('which equates to ' + availableBatteryPower.toFixed(2) + ' kWh of power that can be provided by the battery');
    let powerDeficit = (powerNeeded - availableBatteryPower).toFixed(2);
    this.logger.write('Power deficit: ' + powerDeficit + ' kWh');
    if (powerDeficit <= 0) {
      let d = this.date.now();
      this.control.$('powerSurplus').document = {
        surplus: -powerDeficit,
        timeIndex: d.slotTimeIndex
      };
      this.logger.write('Enough power in battery to meet requirements');
      return 0;
    }
    this.control.$('powerSurplus').delete();
    let noOfSlots = this.noOfSlotsToChargeBy(powerDeficit);
    if (noOfSlots === 0) {
      this.logger.write('Enough power in battery to meet requirements');
    }
    else {
      this.logger.write('This requires ' + noOfSlots + ' slots of charging');
    }
    return noOfSlots;
  }

  get shouldBeCharged() {
    // if previous slot charged battery,save the new battery level
    this.endChargeHistoryRecord();
    //
    if (this.isDischargeControlFlagSet()) {
      this.logger.write('Manual Discharge control flag has been set');
      return false;
    }

    let d = this.date.now();
    if (d.hour > 15 && d.hour < 19) {
      this.logger.write('Dont charge during 16:00 to 19:00 peak');
      return false;
    }
    let batteryLevel = this.levelNow;
    if (!batteryLevel) {
      this.logger.write('Unable to calculate battery level, probably due to comms issues');
      this.logger.write('Dont charge');
      return false;
    }
    if (this.chargeLimit < 100 && batteryLevel >= this.chargeLimit) {
      this.logger.write('Battery level is already at its charge limit of ' + this.chargeLimit);
      this.logger.write('Dont charge');
      return false;
    }
    let alwaysUsePrice = this.agility.alwaysUsePrice;
    let priceNow = +this.octopus.priceNow;
    if (this.octopus.priceNow <= 0) {
      this.logger.write('Slot price of ' + priceNow + ' is at or below zero');
      this.logger.write('Charge');
      return 'charge';
    }
    if (this.octopus.priceNow <= alwaysUsePrice) {
      this.logger.write('Slot price of ' + priceNow + ' is at or below Always Use price of ' + alwaysUsePrice);
      this.logger.write('Charge');
      return 'charge';
    }
    let noOfSlotsNeeded = this.noOfSlotsNeeded;
    if (typeof noOfSlotsNeeded === 'undefined') {
      this.logger.write('Unable to calculate battery power, probably due to comms issues');
      this.logger.write('Dont charge');
      return false;
    }
    if (noOfSlotsNeeded === 0) return false;
    this.logger.write('Check to see if current slot is one of the cheapest up to 16:00');
    let shouldCharge = this.octopus.useCurrentSlotOf(noOfSlotsNeeded);
    if (shouldCharge) shouldCharge = 'charge';
    this.logger.write('Charge battery: ' + shouldCharge);
    return shouldCharge;
  }

  get shouldBeDischarged() {
    let solisNow = this.solis.dataNow;
    if (+solisNow.pvOutputNow > +solisNow.houseLoadNow) {
      this.logger.write('Currently generating more solar PV than house load, so dont attempt to discharge');
      return false;
    }
    let d = this.date.now();
    let prevD = this.date.at(d.previousSlotTimeIndex);
    let previousSlotPower = this.solis.averagePowerBetween(prevD.timeText, d.slotTimeText);
    if (+previousSlotPower.pv > +previousSlotPower.load) {
      this.logger.write('Previous 30 minutes generated more solar PV than house load, so dont attempt to discharge');
      return false;
    }

    if (this.isDischargeControlFlagSet()) {
      this.logger.write('Manual Discharge control flag has been set');
      return true;
    }

    let noOfAlwaysBuySlots = +this.octopus.noOfAlwaysBuySlots;
    if (noOfAlwaysBuySlots === 0) {
      this.logger.write('No slots available under the always buy price, so dont attempt to discharge');
      return false;
    }

    this.logger.write('Number of always buy slots: ' + noOfAlwaysBuySlots);

    let noOfUnmatchedAlwaysBuySlots = this.octopus.noOfUnmatchedAlwaysBuySlots;
    if (noOfUnmatchedAlwaysBuySlots === 0) {
      this.logger.write('No unmatched always buy slots left');
      return false; 
    }
    this.logger.write('Number of unmatched always buy slots: ' + noOfUnmatchedAlwaysBuySlots);

    // calculate net power needed between now and earliest charging slot

    let noOfSlotsNeeded = this.noOfSlotsNeeded;
    if (typeof noOfSlotsNeeded === 'undefined') {
      this.logger.write('Unable to calculate battery level, probably due to comms issues');
      return false; 
    }
    console.log('noOfSlotsNeeded: ' + noOfSlotsNeeded);
    let earliestSlotTimeIndex = this.octopus.getEarliestSlotToUse(noOfSlotsNeeded);
    let earlyD = this.date.at(earliestSlotTimeIndex);
    this.logger.write('earliest charging slot is at ' + earlyD.timeText);
    let power = this.solis.averagePowerBetweenTimeIndices(d.timeIndex, earliestSlotTimeIndex);
    let powerNeeded = +power.load;
    this.logger.write('Power needed from now until earliest charge slot: ' + powerNeeded.toFixed(2));

    // compare with power in battery

    let powerInBattery = this.availablePowerNow;
    if (typeof powerInBattery === 'undefined') {
      this.logger.write('Unable to calculate battery level, probably due to comms issues');
      this.logger.write('Dont discharge');
      return false;
    }
    this.logger.write('Available power in battery: ' + powerInBattery);

    if ((powerInBattery - powerNeeded) > 1) {
      let slot = this.octopus.firstUnmatchedAlwaysBuySlot;
      this.octopus.matchAlwaysBuySlot(slot.dateIndex, slot.timeIndex);
      console.log('matching slot:');
      console.log(slot);
      this.logger.write('enough surplus power to discharge');
      this.logger.write('Matching always use slot: ');
      this.logger.write(JSON.stringify(slot));
      return true;
    }
    this.logger.write('Insufficient surplus power to allow discharge');
    return false;
  }

  cleardownChargeHistory() {
    let count = 0;
    let _this = this;
    this.chargeHistory.forEachChildNode({direction: 'reverse'}, function(timeNode) {
      count++;
      if (count > _this.noOfChargeRecordsToKeep) {
        timeNode.delete();
      }
    });
    this.logger.write('Battery charge history cleared down to most recent ' + this.noOfChargeRecordsToKeep + ' records');
  }

};

export {Battery};

