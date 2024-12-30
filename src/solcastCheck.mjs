import {Agility} from './agility.mjs';

let agility = new Agility();

//let data = await agility.solcast.fetchPredictions();
//console.log(data);

await agility.solcast.updateNow();




