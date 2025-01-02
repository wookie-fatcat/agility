import {Agility} from './agility.mjs';

let agility = new Agility();

console.log('This will check whether Agility can correctly instruct your inverter to charge');
console.log('It will attempt to set it to charge for the next 5 minutes');

let res = await agility.solis.inverterChargeTest()
console.log(JSON.stringify(res));

agility.glsdb.close();










