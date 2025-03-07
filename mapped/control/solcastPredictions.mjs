import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

//let data = agility.solcast.predictionHistory;

let data = agility.solcast.firstProductionTime;
console.log(data);

let time = data.timeIndex;

data = agility.solis.productionDelay;
console.log(data);

time += data;
console.log(time);

console.log(agility.date.at(time));

agility.glsdb.close();




