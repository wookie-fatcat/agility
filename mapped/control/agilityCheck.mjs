import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

console.log('Running: ' + agility.isAlreadyRunning);
agility.glsdb.close();
