import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

let res = agility.solis.profile;
console.log(res);

agility.glsdb.close();