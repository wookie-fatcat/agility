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

class Actions {

  constructor(agility) {
    this.fn = {
      updateOctopusTariffs: async function() {
        return await this.octopus.getLatestTariffTable();
      },
      updateSolcastData: async function() {
        return await this.solcast.update();
      },
      updateSolisData: async function() {
        return await this.solis.update();
      },
      updateYesterdaysSolisData: async function() {
        return await this.solis.update(-1);
      },
      shouldBatteryBeCharged: function() {
        let charge = this.battery.shouldBeCharged;
        if (charge === 'charge') {
          this.addTask('inverterCharge');
        }
        else if (charge === 'gridonly') {
          this.addTask('inverterGridOnly');
        }
        else {
          this.addTask('shouldBatteryBeDischarged');
        }
        return {charge: charge};
      },
      shouldBatteryBeDischarged: function() {
        let discharge = this.battery.shouldBeDischarged;
        if (discharge) {
          this.addTask('inverterDischarge');
        }
        else {
          this.addTask('inverterReset');
        }
        return {discharge: discharge};
      },
      inverterCharge: async function() {
        return await this.solis.inverterCharge();
      },
      inverterDischarge: async function() {
        let override = false;
        if (this.battery.isDischargeControlFlagSet()) {
          override = true;
        }
        return await this.solis.inverterDischarge(override);
      },
      inverterGridOnly: async function() {
        return await this.solis.inverterGridOnly();
      },
      inverterReset: async function() {
        return await this.solis.inverterReset();
      },
      updateInverterTime: async function() {
        return await this.solis.updateInverterTime();
      },
      backup: function() {
        let ignore = ['agilitySSE'];
        this.backup.now(ignore, 'agility.bak');
        return {status: 'Backup completed'};
      },
      cleardownInfo: function() {
        this.octopus.cleardown();
        if (this.solcast.isEnabled) this.solcast.cleardown();
        this.solis.cleardown();
        this.logger.cleardown(this.movingAveragePeriod);
        this.battery.cleardownChargeHistory();
        return {status: 'Cleardown completed'};
      }
    }
  }

};

export {Actions};

