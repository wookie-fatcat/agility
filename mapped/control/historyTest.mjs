import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

//let history = agility.solis.getHistory(1737158400000)

//let history = agility.battery.latestChargeDecision;

let history = agility.battery.peakExport();
console.log(history);
agility.glsdb.close();