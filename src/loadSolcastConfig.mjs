import {Agility} from './agility.mjs';
import {Solcast} from './solcast.mjs';

let agility = new Agility();
let solcast = new Solcast(agility);
let ok = solcast.loadConfig();
console.log(ok);

