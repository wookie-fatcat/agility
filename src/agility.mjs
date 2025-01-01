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

 1 January 2025

 */

import {glsdb} from '../glsdb_loader.mjs';
import {date} from './dates.mjs';
import {Logger} from './logger.mjs';
import {Backup} from './backup.mjs';
import {Octopus} from './octopus.mjs';
import {Solcast} from './solcast.mjs';
import {Solis} from './solis.mjs';
import {Battery} from './battery.mjs';
import {Actions} from './actions.mjs';
import fs from 'fs';

let Agility = class {

  constructor() {
    this.name = 'Agility';
    this.version = '1.1';
    this.glsdb = glsdb;
    this.todayIndex = this.getDateIndex(0);
    this.logger = new Logger(glsdb, 'Agility');
    this.date = date;
    this.backup = new Backup(glsdb);
    this.control = new glsdb.node('agilityControl');
    this.tasks = this.control.$('tasks');
    this.config = new glsdb.node('agilityConfig');
    this.solis = new Solis(this);
    this.octopus = new Octopus(this);
    //if (!this.isConfigured) this.loadConfig();
    // solcast
    if (this.useSolcast) {
      this.solcast = new Solcast(this);
    }
    this.battery = new Battery(this);
    this.actions = new Actions(this);
  }

  sleep(delay) {
    new Promise((resolve) => setTimeout(resolve, delay));
  }

  get isAlreadyRunning() {
    let status = this.control.$('running').lock(1);
    return !status;
  }

  waitUntilStopped() {
    if (this.isAlreadyRunning) {
      this.logger.write('Waiting for Agility to stop: this may take up to a minute')
      let status = this.control.$('running').lock(65);
    }
    this.releaseLock();
    this.removeTask('stop');
    this.logger.write('Agility has stopped');
  }

  releaseLock() {
    this.control.$('running').unlock();
  }

  getDateIndex(offset) {
    offset = offset || 0;
    let mn = date.atMidnight(offset);
    return mn.timeIndex;
  }

  get isConfigured() {
    return this.config.exists;
  }

  get dischargingEnabled() {
    // disabled by default
    let dischargeConfig = this.config.$(['operation', 'dischargingEnabled']);
    if (!dischargeConfig.exists) return false;
    return dischargeConfig.value;
  }

  enableDischarging() {
    this.config.$(['operation', 'dischargingEnabled']).value = true;
  }

  disableDischarging() {
    delete this.config.$(['operation', 'dischargingEnabled']);
  }

  get useSolcast() {
    return this.config.$('solcast').exists;
  }

  get now() {
    return date.now().timeText;
  }

  clearAllData() {
    this.octopus.tariffs.delete();
    if (this.solcast) this.solcast.document.delete();
    this.solis.data.delete();
    this.logger.deleteAll();
  }

  get alwaysUsePrice() {
    if (!this.config.$(['operation', 'alwaysUseSlotPrice']).exists) return 10;
    return +this.config.$(['operation', 'alwaysUseSlotPrice']).value;
  }

  set alwaysUsePrice(value) {
    this.config.$(['operation', 'alwaysUseSlotPrice']).value = value;
  }

  get movingAveragePeriod() {
    return +this.config.$(['operation', 'movingAveragePeriod']).value;
  }

  set movingAveragePeriod(days) {
    if (!this.config.$(['operation', 'movingAveragePeriod']).exists) return 14;
    this.config.$(['operation', 'movingAveragePeriod']).value = days;
  }

  get lastSlotHandled() {
    return this.control.$('lastSlotHandled').value;
  }

  set lastSlotHandled(timeText) {
    this.control.$('lastSlotHandled').value = timeText;
  }


  addTask(task) {
    this.tasks.$(task).value = true;
  }

  taskFailed(task) {
    this.tasks.$(task).value = false;
  }

  resetFailedTasks() {
    let _this = this;
    this.tasks.forEachChildNode(function(taskNode) {
      _this.addTask(taskNode.key);
    });
  }

  removeTask(task) {
    this.tasks.$(task).delete();
  }

  clearTasks() {
    let stopSet = this.tasks.$('stop').exists;
    this.tasks.delete();
    if (stopSet) this.addTask('stop');
  }

  todo(task) {
    if (this.tasks.$(task).exists) {
      return this.tasks.$(task).value;
    }
    return false;
  }

  get hasTasks() {
    let _this = this;
    let status = false;
    this.tasks.forEachChildNode(function(taskNode) {
      let task = taskNode.key;
      if (!_this.actions.fn[task]) {
        // no method assigned to task so remove it
        taskNode.delete();
      }
      else if (_this.todo(task)) {
        status = true;
        return false;
      }
    });
    //console.log('hasTasks: ' + status);
    return status;
  }

  setTasks() {
    // based on current time, add tasks to be done
    let now = date.now();
    let newSlot = (now.minute === 0 || now.minute === 30);
    if (!newSlot && now.slotTimeText !== this.lastSlotHandled) {
      // this slot was missed for some reason, so handle it now
      newSlot = true;
    }
    if (newSlot) {
      this.clearTasks();
      this.addTask('updateOctopusTariffs');
      if (this.useSolcast) this.addTask('updateSolcastData');
      this.addTask('updateSolisData');
      this.addTask('shouldBatteryBeCharged');
      if (now.slotTimeText === '00:00') {
        // started a new day
        this.addTask('cleardownInfo');
        this.addTask('updateYesterdaysSolisData');
        this.addTask('updateInverterTime');
      }
    }
    if (now.minute === 15 || now.minute === 45) {
      this.addTask('backup');
    }
    this.lastSlotHandled = now.slotTimeText;
  }

  stop() {
    this.addTask('stop');
  }

  async performTask(task) {
    this.logger.write('perform task ' + task);
    if (this.actions.fn[task]) {
      let fn = this.actions.fn[task];
      let status;
      if (fn.constructor.name == 'AsyncFunction') {
        status = await fn.call(this);
        this.logger.write(JSON.stringify(status));
      }
      else {
        status = fn.call(this);
        this.logger.write(JSON.stringify(status));
      }
      if (status.error) {
        console.log('error running ' + task);
        console.log(status);
        this.taskFailed(task);
      }
      else {
        this.removeTask(task);
      }
    }
    else {
      this.removeTask(task);
    }
  }

  async invokeTasks() {
    if (this.todo('stop')) {
      await this.shutdown();
      return;
    }
    for (let task in this.actions.fn) {
      if (this.todo(task)) {
        await this.performTask(task);
      }
    }
  }

  async shutdown() {
    this.logger.write('Agility instructed to shut down');
    this.removeTask('stop');
    let ignore = ['agilityLog', 'agilityControl'];
    this.backup.now(ignore, 'agility.bak'); 
    clearInterval(this.timer);
    await this.sleep(2000);
    this.releaseLock();
    this.glsdb.close();
    process.exit();
  }

  initialise() {
    let ok = true;
    if (!this.config.exists) {
      this.logger.write('No Configuration defined for Agility: Attempt to load from config.json');
      let ok = this.loadConfig();
      if (!ok) {
        this.logger.write('Unable to load from config.json');
      }
    }
    if (ok && !this.config.exists) {
      this.logger.write('No Configuration defined for Agility');
      ok = false;
    }
    if (ok && !this.battery.isConfigured) {
      this.logger.write('Battery Configuration does not exist or is incomplete');
      ok = false;
    }
    if (ok && !this.battery.isConfigured) {
      this.logger.write('Battery Configuration does not exist or is incomplete');
      ok = false;
    }
    if (ok && !this.octopus.isConfigured) {
      this.logger.write('Octopus Configuration does not exist or is incomplete');
      ok = false;
    }
    if (ok && this.useSolcast && !this.solcast.isConfigured) {
      this.logger.write('Solcast Configuration does not exist or is incomplete');
      ok = false;
    }
    if (ok && !this.solis.isConfigured) {
      this.logger.write('SolisCloud Configuration does not exist or is incomplete');
      ok = false;
    }
    if (!ok) {
      this.logger.write('Unable to start');
      process.exit();
    }
    else {
      this.logger.write('Agility started');
    }
    if (!this.solis.data.exists) {
      this.logger.write('No historical SolisCloud Data exists, so loading it now');
      this.solis.restore();
    }
    return ok;
  }

  run() {
    if (this.isAlreadyRunning) {
      this.logger.write('Agility is already running - run request ignored');
      return;
    }
    let ok = this.initialise();
    if (!ok) return;
    let _this = this;
    this.timer = setInterval(async function() {
      _this.logger.write('Checking at ' + _this.now);
      _this.setTasks();
      do {
        await _this.invokeTasks();
      }
      while (_this.hasTasks);
      _this.resetFailedTasks();
    }, 60000);
  }

  loadConfig(filepath) {
    filepath = filepath || './config.json';
    try {
      let json = fs.readFileSync(filepath, { encoding: 'utf8', flag: 'r' });
      this.config.delete();
      this.config.document = JSON.parse(json);
      return true;
    }
    catch(err) {
      // config couldn't be set up
      return false;
    }
  }

  resetData() {
    // delete all the operational data
    //  Agility will reload what it can when it is restarted
    this.solis.data.delete();
    this.octopus.tariffs.delete();
    if (this.useSolcast) this.solcast.document.delete();
    this.logger.loggerDoc.delete(); 
    this.logger.write('Agility Data has been deleted');
  }
}

export {Agility}

