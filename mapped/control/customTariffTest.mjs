import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

/*
let res = await agility.octopus.fetchTariff(0);
console.log(JSON.stringify(res, null, 2));

//console.log(agility.battery.calculationCutoffTime);
*/

let res = await agility.octopus.getLatestTariffTable();
console.log(res);

agility.glsdb.close();
