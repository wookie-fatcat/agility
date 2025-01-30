import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();
let res = await agility.solis.setTimeNowAPI();
console.log(res);
agility.glsdb.close();









