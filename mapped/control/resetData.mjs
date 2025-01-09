import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();
agility.resetData();
console.log('All Agility Data has been deleted');
agility.glsdb.close();

