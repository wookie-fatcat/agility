import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

console.log('This will check whether Agility can access your SolisCloud account');
console.log('It will attempt to download your usage information for today');
console.log('If successful, it will display the raw JSON data');

let res = await agility.solis.inverterDayAPI(0);
console.log(res);
agility.glsdb.close();









