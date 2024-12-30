/*

 ----------------------------------------------------------------------------
 | Agility: Solar Battery Optimisation against Octopus Agile Tariff          |
 |           specifically for Solis Inverters                                |
 |                                                                           |
 | Copyright (c) 2024 MGateway Ltd,                                          |
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

 29 December 2024

*/

import {date} from './dates.mjs';
import readline from 'node:readline';

let Logger = class {

  constructor(glsdb, appName) {
    appName = appName || 'default';
    this.glsdb = glsdb;
    let loggerDoc = new this.glsdb.node('agilityLog');
    this.logDoc = loggerDoc.$(appName);
  }

  write(text, filter) {
    let dateProps = date.atMidnight();
    let logDateDoc = this.logDoc.$(dateProps.timeIndex);
    let no = logDateDoc.$('counter').increment();
    let now = date.now();
    let data = {
      time: now.fullTimeText,
      value: text,
      filter: filter
    };
    logDateDoc.$(no).document = data; 
  }

  read(offset) {
    offset = offset || 0;
    let dateProps = date.atMidnight(offset);
    let logDateDoc = this.logDoc.$(dateProps.timeIndex);
    logDateDoc.forEachChildNode(function(noNode) {
      if (noNode.key !== 'counter') {
        let time = noNode.$('time').value;
        let value = noNode.$('value').document;
        if (typeof value !== 'object') {
          console.log(time + ': ' + value);
        }
        else {
          console.log(time + ': ' + JSON.stringify(value, null, 2));
        }
      }
    });
  }

  readBetween(fromStr, toStr, offset) {
    offset = offset || 0;
    fromStr = fromStr || '00:01';
    toStr = toStr || '23:59';

    let dateProps = date.atMidnight(offset);
    let dateIndex = dateProps.timeIndex;

    let fromTime = date.atTime(fromStr, dateIndex).timeIndex;
    let toTime = date.atTime(toStr, dateIndex).timeIndex;

    let logDateDoc = this.logDoc.$(dateIndex);
    logDateDoc.forEachChildNode(function(noNode) {
      if (noNode.key !== 'counter') {
        let time = noNode.$('time').value;
        let d = date.atTime(time, dateIndex);
        if (d.timeIndex >= fromTime && d.timeIndex <= toTime) {
          let value = noNode.$('value').document;
          if (typeof value !== 'object') {
            console.log(time + ': ' + value);
          }
          else {
            console.log(time + ': ' + JSON.stringify(value, null, 2));
          }
        }
      }
    });
  }

  tail(from) {
    /*
    readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    */

    from = from || 0;
    let dateProps = date.atMidnight(0);
    let dateIndex = dateProps.timeIndex;
    let logDateDoc = this.logDoc.$(dateIndex);

    let timer = setInterval(() => {
      //console.log('waking');
      //console.log('from: ' + from);
      let seed = from;
      logDateDoc.forEachChildNode({from: from}, function(noNode) {
        //console.log(noNode.key);
        if (noNode.key !== 'counter' && noNode.key !== seed) {
          let time = noNode.$('time').value;
          let value = noNode.$('value').document;
          if (typeof value !== 'object') {
            console.log(time + ': ' + value);
          }
          else {
            console.log(time + ': ' + JSON.stringify(value, null, 2));
          }
          from = noNode.key;
        }
      });
    }, 10000);

  }

  deleteAll() {
    this.logDoc.delete();
  }

  deleteAgo(offset) {
    offset = -offset || 0;
    let dateProps = date.atMidnight(offset);
    this.logDoc.$(dateProps.timeIndex).delete();
  }

  cleardown(noOfDaysToKeep) {
    noOfDaysToKeep = noOfDaysToKeep || 7;
    let count = 0;
    this.logDoc.forEachChildNode({direction: 'reverse'}, function(dateNode) {
      count++;
      if (count > noOfDaysToKeep) {
        dateNode.delete();
      }
    });
    this.write('Logger data cleared down to most recent ' + noOfDaysToKeep + ' days');
  }

  log(offset, from, to) {
    offset = offset || 0;
    if (!from) {
      this.read(offset);
    }
    else {
      this.readBetween(from, to, offset);
    }
  }

};

export {Logger};