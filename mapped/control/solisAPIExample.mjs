import {Agility} from '/opt/agility/mapped/agility.mjs';
let agility = new Agility();
/*
let url = '/v2/api/atRead';
let body ={
  inverterSn: agility.solis.inverterSn,
  cid: 636
};
let resp = await agility.solis.api(url, body);
console.log(resp);
*/


let url = '/v1/api/inverterDetail';
let body ={
  sn: agility.solis.inverterSn
};
let resp = await agility.solis.api(url, body);
console.log(JSON.stringify(resp, null, 2));

let stationId = resp.data.stationId;

console.log('++++++++++');
console.log('stationId: ' + stationId);
console.log('++++++++++');


url = '/v1/api/collectorList';
body ={
  stationId: stationId
};
resp = await agility.solis.api(url, body);
console.log(JSON.stringify(resp, null, 2));


for (let record of resp.data.page.records) {
  console.log('dataLogger: ' + record.monitorModel);
}

console.log('************');

url = '/v1/api/inverterList';
body ={
  stationId: stationId
};
resp = await agility.solis.api(url, body);
console.log(JSON.stringify(resp, null, 2));




agility.glsdb.close();









