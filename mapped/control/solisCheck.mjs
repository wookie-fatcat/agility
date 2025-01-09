import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();


let res = agility.solis.datesAvailable;
console.log(res);

res = agility.solis.averageLoadBetween();
console.log(res);


/*
let res = await agility.solis.update();
console.log(res);
*/

/*
let res;
await agility.solis.restore();

res = agility.solis.getDataAt('00:00');
console.log(res);

res = agility.solis.getDataAt('00:00', -1);
console.log(res);

res = agility.solis.getDataAt('00:00', -2);
console.log(res);


res = agility.solis.dataNow;
console.log(res);

res = agility.solis.datesAvailable;
console.log(res);

agility.solis.cleardown();
res = agility.solis.datesAvailable;
console.log(res);

*/

agility.glsdb.close();








