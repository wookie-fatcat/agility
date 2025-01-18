import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

let data = agility.solcast.predictionHistory;
console.log(data);
agility.glsdb.close();




