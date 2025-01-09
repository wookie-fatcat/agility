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

import fs from 'fs';
import events from 'events';
import readline from 'readline';

let Backup = class {

  constructor(glsdb) {
    this.glsdb = glsdb;
  }

  now(ignore, filename) {
    ignore = ignore || [];
    filename = filename || 'backup.txt';
    filename = '/opt/agility/mapped/logs/' + filename;

    let docs = this.glsdb.directory;
    //console.log({docs});
    //console.log({ignore});
    console.log('backup system to ' + filename);
    fs.writeFileSync(filename, 'Backup at ' + new Date().toUTCString() + '\n', {encoding: "utf8"});

    for (let docname of docs) {
      if (!ignore.includes(docname)) {
        let doc = new this.glsdb.node(docname);
        console.log('Backing up ' + docname);
        doc.forEachLeafNode({getdata: true}, function(keys, data) {
          let name = keys[0];
          keys.shift();
          fs.writeFileSync(filename, name + '\n', {encoding: "utf8", flag: "a+"});
          fs.writeFileSync(filename, JSON.stringify(keys) + '\n', {encoding: "utf8", flag: "a+"});
          fs.writeFileSync(filename, data + '\n', {encoding: "utf8", flag: "a+"});
        });
      }
    }
  }

  async restore(filename) {
    filename = filename || 'backup.txt';
    let glsdb = this.glsdb;

    async function processLineByLine(filename) {
      try {
        const rl = readline.createInterface({
          input: fs.createReadStream(filename),
          crlfDelay: Infinity
        });

        let count = 0;
        let subcount = 0;
        let lastName = '';
        let doc;
        let name;
        let subscripts;

        rl.on('line', (line) => {
          count++;
          if (count > 1) {
            subcount++;
            if (subcount === 1) {
              name = line;
              if (name !== lastName) {
                doc = new glsdb.node(name);
                lastName = name;
              }
            }
            if (subcount === 2) subscripts = JSON.parse(line);
            if (subcount === 3) {
              doc.$(subscripts).value = line;
              subcount = 0;
            }
          }
        });
        await events.once(rl, 'close');
      } 
      catch (err) {
        console.error(err);
      }
    }

    await processLineByLine(filename);
  }

};

export {Backup};
