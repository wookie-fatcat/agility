import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();
console.log('Checking configuration');
if (!agility.isConfigured) {
  console.log('Loading basic default settings');
  agility.loadConfig();
}
agility.glsdb.close();


