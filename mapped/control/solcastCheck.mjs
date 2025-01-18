import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

//let data = await agility.solcast.fetchPredictions();
//console.log(data);

//await agility.solcast.updateNow();

let res = agility.solcast.cleardown();
console.log(res);

agility.glsdb.close();




