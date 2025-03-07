import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();


let res = await agility.getLatestVersionNo();
console.log('Latest version on github: ' + res.version);

console.log(agility.myCurrentVersion);

/*

//let update = await agility.isUpdateAvailable();
//console.log('update: ' + update);

console.log(agility.actions.fn);

let res = await agility.actions.fn.checkForUpdates.call(agility);
console.log(res)
*/
agility.glsdb.close();