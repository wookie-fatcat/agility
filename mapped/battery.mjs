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

 12 January 2025

 */


class Battery {

  constructor(agility) {
    this.config = agility.config.$('battery');
    this.logger = agility.logger;
    this.date = agility.date;
    this.solis = agility.solis;
    this.solcast = agility.solcast;
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
    if (!this.config.$('chargeLimit').exists) return 95;
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

  netPowerBetween(fromTimeText, toTimeText, override) {

    this.logger.write('Calculating expected power between ' + fromTimeText + ' and ' + toTimeText);
    let averageExpectedPower;

    if (!override && this.octopus.tomorrowsTariffsAvailable) {
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
    if (this.solcast.isEnabled) {
      let spv = this.solcast.expectedPowerBetween(fromTimeText, toTimeText, override);
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
    this.logger.write('Each charge will increase battery percentage by ' + increasePerCharge);
    let powerAddedPerCharge =  this.powerFromPercentage(increasePerCharge);
    this.logger.write('power added per charge: ' + powerAddedPerCharge.toFixed(2));
    let noOfSlots = Math.round(deficit / powerAddedPerCharge);
    this.logger.write('no of slots needed for deficit of ' + deficit.toFixed(2) + ': ' + noOfSlots);
    return noOfSlots;
  }

  getPowerDeficit(fromTimeText, toTimeText) {
    let powerNeeded = this.netPowerBetween(fromTimeText, toTimeText);
    let batteryLevel = this.levelNow;
    if (!batteryLevel) return 0; // ******* to do
    this.logger.write('Battery level is currently ' + batteryLevel + '%');
    let availableBatteryPower = this.availablePowerFromPercentage(batteryLevel);
    this.logger.write('which equates to ' + availableBatteryPower.toFixed(2) + ' kWh of power that can be provided by the battery');
    let powerDeficit = powerNeeded - availableBatteryPower;
    this.logger.write('Power deficit: ' + powerDeficit.toFixed(2) + ' kWh');
    return powerDeficit;
  }

  noOfSlotsNeeded(powerDeficit) {
    /*
    let batteryLevel = this.levelNow;
    if (!batteryLevel) return;
    this.logger.write('Battery level is currently ' + batteryLevel + '%');
    let availableBatteryPower = this.availablePowerFromPercentage(batteryLevel);
    this.logger.write('which equates to ' + availableBatteryPower.toFixed(2) + ' kWh of power that can be provided by the battery');
    let powerDeficit = (powerNeeded - availableBatteryPower).toFixed(2);
    this.logger.write('Power deficit: ' + powerDeficit + ' kWh');
    */
    if (powerDeficit <= 0) {
      /*
      let d = this.date.now();
      this.control.$('powerSurplus').document = {
        surplus: -powerDeficit,
        timeIndex: d.slotTimeIndex
      };
      */
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
    this.solis.endChargeHistoryRecord();
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
    let powerDeficit = this.getPowerDeficit(this.date.now().slotTimeText, '22:30');
    this.logger.write('Net power needed between now and 22:30: ' + powerDeficit.toFixed(2));


    let noOfSlotsNeeded = this.noOfSlotsNeeded(powerDeficit);
    if (typeof noOfSlotsNeeded === 'undefined') {
      this.logger.write('Unable to calculate battery power, probably due to comms issues');
      this.logger.write('Dont charge');
      return false;
    }
    if (noOfSlotsNeeded === 0) return false;

    // how many charge slots remaining in battery?
    this.logger.write('Determine whether to charge, use grid power or do nothing...');
    this.logger.write('Current battery level is ' + batteryLevel);
    this.logger.write('Percent left before full: ' + (100 - batteryLevel));
    let shouldCharge;

    let noOfSlotsToFillBattery = 0;
    if (batteryLevel < 100) {
      let powerNeededToFillBattery = this.powerFromPercentage(100 - batteryLevel);
      this.logger.write('That equates to ' + powerNeededToFillBattery.toFixed(2) + ' kWh');
      noOfSlotsToFillBattery = this.noOfSlotsToChargeBy(powerNeededToFillBattery);
    }
    else {
      this.logger.write('Battery is already full');
    }

    // get array of slots in descending price order

    this.octopus.sortSlots();
    let slots = this.octopus.cheapestSlotArray;
    let remainingPowerNeeded = +powerDeficit;

    let currentSlotTimeIndex = this.date.now().slotTimeIndex;
    let count = 0;
    let chargeAction;
    this.logger.write('=============');
    this.logger.write('Summary position:');
    this.logger.write('Current battery level is ' + batteryLevel + '%');
    this.logger.write('Total net battery storage power deficit: ' + powerDeficit.toFixed(2));
    this.logger.write('no of slots needed to currently fill battery: ' + noOfSlotsToFillBattery);
    this.logger.write('no of slots needed to meet net power deficit: ' + noOfSlotsNeeded);
    let increasePerCharge = this.percentIncreasePerCharge;
    this.logger.write('Each charge will increase battery percentage by ' + increasePerCharge.toFixed(2));
    let powerAddedPerCharge =  this.powerFromPercentage(increasePerCharge);
    this.logger.write('Which equates to ' + powerAddedPerCharge.toFixed(2) + 'kWh');
    this.logger.write('=============');

    for (let slot of slots) {
      count++;
      let d = this.date.at(slot.timeIndex);
      this.logger.write('slot ' + count + ': ' + d.slotTimeText + ': price: ' + slot.price);

      // if battery level is at or below the minimum, nothing to do

      if (count > noOfSlotsToFillBattery && batteryLevel <= this.minimumLevel) {
        chargeAction = false;
        this.logger.write('Battery is at or below its minumum level, so no action (will use grid power)');
        break;
      }

      if (count === 1 && noOfSlotsNeeded === 1 && +currentSlotTimeIndex === +slot.timeIndex) {
        // use this slot if it's the first and only 1 charge slot needed
        this.logger.write('Only 1 slot needed and this current one is the cheapest available, so use it')
        chargeAction = 'charge';
        break;
      }

      if (count <= noOfSlotsToFillBattery) {
        remainingPowerNeeded = remainingPowerNeeded - powerAddedPerCharge;
        this.logger.write('remainining power needed after battery charge: ' + remainingPowerNeeded.toFixed(2));
      }
      else {
        let slotEndTimeText = this.date.at(d.slotEndTimeIndex).timeText;
        let netPower;
        if (d.slotTimeText === '23:30') {
          netPower = 0;
        }
        else {
          netPower = this.netPowerBetween(d.slotTimeText, slotEndTimeText, true);
        }
        this.logger.write('Net power until slot end at ' + slotEndTimeText + ': ' + netPower.toFixed(2));
        remainingPowerNeeded = remainingPowerNeeded - netPower;
        this.logger.write('remainining power needed: ' + remainingPowerNeeded.toFixed(2));
      }

      if (remainingPowerNeeded <= 0) {
        this.logger.write('Power deficit would be accounted for by previous cheaper slots: take no action');
        chargeAction = false;
        break;
      }

      if (+currentSlotTimeIndex === +slot.timeIndex) {

        // slot is the current one,so:

        if (count <= noOfSlotsToFillBattery) {
          chargeAction = 'charge';
          this.logger.write('use this slot to charge battery, even if generating a surplus from PV');
          break;
        }
        this.logger.write('Slot is not to be used to charge battery');

        /*
        if (netPower <= 0) {
          // this slot will generate a surplus or use zero power, so take no action
          chargeAction = false;

          this.logger.write('And this slot will generate a surplus or use zero power, so take no action');
          break;
        }
        */
        // use this slot for grid only power
        this.logger.write('But use grid power only during this slot');
        chargeAction = 'gridonly';
        break;
      }

      if (count === noOfSlotsNeeded) {
        this.logger.write('Reached limit of ' + noOfSlotsNeeded + ' slots');
        this.logger.write('Let this slot draw power from battery');
        chargeAction = false;
        break;
      }      

      this.logger.write('********');

    }
    return chargeAction;
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

    let powerNeeded = this.netPowerBetween(this.date.now().slotTimeText, '22:30');
    this.logger.write('Net power needed between now and 22:30: ' + powerNeeded.toFixed(2));

    let noOfSlotsNeeded = this.noOfSlotsNeeded(powerNeeded);
    if (typeof noOfSlotsNeeded === 'undefined') {
      this.logger.write('Unable to calculate battery level, probably due to comms issues');
      return false; 
    }
    console.log('noOfSlotsNeeded: ' + noOfSlotsNeeded);
    let earliestSlotTimeIndex = this.octopus.getEarliestSlotToUse(noOfSlotsNeeded);
    let earlyD = this.date.at(earliestSlotTimeIndex);
    this.logger.write('earliest charging slot is at ' + earlyD.timeText);
    let power = this.solis.averagePowerBetweenTimeIndices(d.timeIndex, earliestSlotTimeIndex);
    powerNeeded = +power.load;
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

