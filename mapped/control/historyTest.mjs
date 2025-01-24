import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

let history = agility.solis.getHistory(1737158400000)

console.log(history);
agility.glsdb.close();