import {Agility} from '/opt/agility/mapped/agility.mjs';
import {Solcast} from '/opt/agility/mapped/solcast.mjs';

let agility = new Agility();
let solcast = new Solcast(agility);
let ok = solcast.loadConfig();
console.log(ok);
agility.glsdb.close();

