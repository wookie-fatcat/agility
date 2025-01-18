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

 17 January 2025

*/

// https://api.octopus.energy/v1/products/AGILE-23-12-06/electricity-tariffs/E-1R-AGILE-23-12-06-J/standard-unit-rates/

let Octopus = class {

  constructor(agility) {
    let glsdb = agility.glsdb;
    this.config = agility.config.$('octopus');
    this.tariffs = new glsdb.node('octopusAgile');
    this.byTime = this.tariffs.$('byTime');
    this.byPrice = this.tariffs.$('byPrice');
    this.date = agility.date;
    this.agility = agility;
    this.logger = agility.logger;
  }

  get isConfigured() {
    if (!this.config.exists) return false;
    let data = this.config.document;
    if (!data.url1) return false;
    if (!data.url2) return false;
    if (!data.zone) return false;
    //if (!data.username) return false;
    return true;
  }

  get url1() {
    return this.config.$('url1').value;
  }

  get url2() {
    return this.config.$('url2').value;
  }

  get zone() {
    return this.config.$('zone').value;
  }

  get username() {
    return this.config.$('username').value;
  }

  async request(url, username) {
    let options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    };
    if (username && username !== '') {
      options.headers.Authorization = 'Basic ' + Buffer.from(username + ':', 'utf8').toString('base64');
    }
    let res = await fetch(url, options);
    try {
      let json = await res.json();
      return json;
    }
    catch(err) {
      return {error: 'API Request failed'};
    }
  }

  async fetchTariff() {
    if (!this.config.exists) {
      return {error: 'Agility has not been configured to access Octopus Tariffs'};
    }
    else {
      let url = this.url1 + this.zone + this.url2;
      return await this.request(url, this.username);
    }
  }

  get isBefore4() {
    return this.date.now().hour < 16;
  }

  get dateIndexNow() {
    return this.date.atMidnight(0).timeIndex;
  }

  get dateIndexTomorrow() {
    return this.date.atMidnight(1).timeIndex;
  }

  async getLatestTariffTable() {
    let json;
    if (this.isBefore4) {
      // has tariff already been saved for today?
      if (!this.byTime.$(this.dateIndexNow).exists) {
        json = await this.fetchTariff();
      }
    }
    else {
      // has tariff already been saved for today?
      if (!this.byTime.$(this.dateIndexNow).exists) {
        json = await this.fetchTariff();
      }
      else if (!this.byTime.$(this.dateIndexTomorrow).exists) {
        json = await this.fetchTariff();
      }
    }
    if (json) {
      if (json.error) {
        return json;
      }
      if (!json.results || !Array.isArray(json.results)) {
        console.log(666666);
        return {error: 'No results returned from Octopus'};
      }
      for (let slot of json.results) {
        let slotTime = this.date.at(slot.valid_from);
        let dateIndex = slotTime.dateIndex;
        let timeIndex = slotTime.timeIndex;
        let slotNode = this.byTime.$([dateIndex, timeIndex]);
        if (!slotNode.exists) {
          let startTimeStr = slotTime.timeText;
          let to_d = this.date.at(slot.valid_to);
          let endTimeStr = to_d.timeText;
          let price = +slot.value_inc_vat;
          slotNode.document = {
            start: startTimeStr,
            hour: slotTime.hourText,
            min: slotTime.minuteText,
            end: endTimeStr,
            endTimeIndex: to_d.timeIndex,
            price: price,
            day: slotTime.day,
            month: slotTime.month,
            timeIndex: timeIndex,
            dateIndex: dateIndex
          }
        }
      }
      return {status: 'Octopus Tariff Table fetched and updated'}
    }
    else {
      return {status: 'Tariff Table already up to date'}
    }
  }

  get lastSlot() {
    return this.byTime.lastChild.lastChild.document;
  }

  get tomorrowsTariffsAvailable() {
    if (+this.date.now().dateIndex < +this.lastSlot.dateIndex) return true;
    return false;
  }

  get priceNow() {
    let d = this.date.now();
    return this.byTime.$([d.dateIndex, d.slotTimeIndex, 'price']).value;
  }

  getPriceAt(timeStr, offset) {
    offset = offset || 0;
    timeStr = timeStr || '00:00';
    let d = this.date.atTime(timeStr, dateIndex);
    return this.byTime.$([d.dateIndex, d.timeIndex, 'price']).value;
  }

  sortSlots(to) {
    to = to || '18:00';
    this.byPrice.delete();
    let now = this.date.now();
    let dateIndex = now.dateIndex;
    let timeIndex = now.slotTimeIndex;
    let _this = this;

    function addToSortIndex(timeNode) {
      let price = +timeNode.$('price').value;
      let dateIndex = timeNode.$('dateIndex').value;
      let priceIndex = +(price * 100).toFixed(2);
      let time = timeNode.$('start').value;
      let day = timeNode.$('day').value;
      let timeIndex = timeNode.key;
      _this.byPrice.$([priceIndex, dateIndex, timeIndex]).document = {
        time: time,
        day: day,
        price: price
      };
    }

    if (this.tomorrowsTariffsAvailable) {
      console.log('tomorrows tariffs available');
      // use todays slots from now until 23:30 and tomorrows from midnight until to time (default 18:00)
      this.byTime.$(dateIndex).forEachChildNode({from: timeIndex}, function(timeNode) {
        addToSortIndex(timeNode);
      });
      let toTimeIndex = this.date.atTime(to, this.lastSlot.dateIndex).timeIndex;
      console.log('toTimeIndex: ' + toTimeIndex);
      this.byTime.$(this.lastSlot.dateIndex).forEachChildNode({to: toTimeIndex}, function(timeNode) {
        addToSortIndex(timeNode);
      });
    }
    else {
     // use todays slots from now until to time (default 18:00)
      console.log('tomorrows tariffs not yet available');
      let toTimeIndex = this.date.atTime(to).timeIndex;
      console.log('toTimeIndex: ' + toTimeIndex);
      this.byTime.$(this.lastSlot.dateIndex).forEachChildNode({from: timeIndex, to: toTimeIndex}, function(timeNode) {
        addToSortIndex(timeNode);
      });
    }
  }

  get cheapestSlotArray() {
    let arr = [];
    let _this = this;
    this.byPrice.forEachChildNode(function(priceNode) {
      priceNode.forEachChildNode(function(dateNode) {
        let dateIndex = dateNode.key;
        dateNode.forEachChildNode(function(timeNode) {
          let timeText = _this.date.at(timeNode.key).timeText;
          arr.push({
            dateIndex: dateIndex,
            timeIndex: timeNode.key,
            timeText: timeText,
            price: timeNode.$('price').value
          });
        });
      });
    });
    return arr;
  }

  getEarliestSlotToUse(noOfSlots) {
    console.log('calculating earliest slot of ' + noOfSlots);
    // includes slots under always use price
    this.sortSlots();
    let slots = this.cheapestSlotArray;
    console.log(JSON.stringify(slots));
    let count = 0;
    let currentSlot = this.date.now().slotTimeIndex;
    console.log('current slot timeIndex: ' + currentSlot);
    let alwaysUsePrice = this.agility.alwaysUsePrice;
    let earliestSlot = 9999999999999;
    for (let slot of slots) {
      count++;
      console.log('count: ' + count + '; timeIndex: ' + slot.timeIndex);
      if (slot.timeIndex > currentSlot) {
        if (slot.price <= alwaysUsePrice) {
          if (slot.timeIndex < earliestSlot) {
            earliestSlot = slot.timeIndex;
            let d = this.date.at(slot.timeIndex);
            console.log('slot under always buy price');
            console.log('slot: ' + d.timeText + ': price: ' + slot.price + 'updated earliest slot');
          }
        }
        else {
          if (count <= noOfSlots && slot.timeIndex < earliestSlot) {
            earliestSlot = slot.timeIndex;
            let d = this.date.at(slot.timeIndex);
            console.log('slot over always buy price');
            console.log('slot: ' + d.timeText + ': price: ' + slot.price + 'updated earliest slot');
          }
        }
      }
    }
    return earliestSlot;
  }

  useCurrentSlotOf(noOfCheapSlots) {
    noOfCheapSlots = noOfCheapSlots || 0;
    noOfCheapSlots = + noOfCheapSlots;
    let useSlot = false;
    if (noOfCheapSlots > 0) {
      // get cheapest slots in price order up to default time of 18:00
      this.sortSlots();
      let slots = this.cheapestSlotArray;
      let now = this.date.now();
      let count = 0;
      for (let slot of slots) {
        count++
        let d = this.date.at(slot.timeIndex);
        this.logger.write('Slot ' + count + ': ' + d.dayText + '/' + d.monthText + '/' + d.year + ': ' + d.timeText + ': ' + slot.price);
        if (+slot.dateIndex === +now.dateIndex && +slot.timeIndex === +now.slotTimeIndex) {
          return true;
        }
        if (count === noOfCheapSlots) break;
      }
      return false;
    }
    return  false;
  }

  get noOfAlwaysBuySlots() {
    this.sortSlots();
    let slots = this.cheapestSlotArray;
    let noOfAlwaysBuySlots = 0;
    let alwaysUsePrice = this.agility.alwaysUsePrice;
    for (let slot of slots) {
      if (slot.price <= alwaysUsePrice) {
        noOfAlwaysBuySlots++;
      }
    }
    return noOfAlwaysBuySlots;
  }

  get noOfUnmatchedAlwaysBuySlots() {
    this.sortSlots();
    let slots = this.cheapestSlotArray;
    let noOfUnmatchedAlwaysBuySlots = 0;
    let alwaysUsePrice = this.agility.alwaysUsePrice;
    for (let slot of slots) {
      if (slot.price <= alwaysUsePrice) {
        if (!this.isAlwaysBuySlotMatched(slot.dateIndex, slot.timeIndex)) {
          noOfUnmatchedAlwaysBuySlots++;
        }
      }
    }
    return noOfUnmatchedAlwaysBuySlots;
  }

  matchAlwaysBuySlot(dateIndex, timeIndex) {
    this.byTime.$([dateIndex, timeIndex, 'matched']).value = true;
  }

  isAlwaysBuySlotMatched(dateIndex, timeIndex) {
    return this.byTime.$([dateIndex, timeIndex, 'matched']).exists;
  }

  get firstUnmatchedAlwaysBuySlot() {
    this.sortSlots();
    let slots = this.cheapestSlotArray;
    let alwaysUsePrice = this.agility.alwaysUsePrice;
    for (let slot of slots) {
      if (slot.price <= alwaysUsePrice) {
        if (!this.isAlwaysBuySlotMatched(slot.dateIndex, slot.timeIndex)) {
          return slot;
        }
      }
    }
    return false;
  }

  cleardown() {
    let noOfDaysToKeep = this.agility.movingAveragePeriod;
    let count = 0;
    this.byTime.forEachChildNode({direction: 'reverse'}, function(dateNode) {
      count++;
      if (count > noOfDaysToKeep) {
        dateNode.delete();
      }
    });
    this.logger.write('Octopus data cleared down to most recent ' + noOfDaysToKeep + ' days');
  }

};

export {Octopus};

