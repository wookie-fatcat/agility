import {Agility} from '/opt/agility/mapped/agility.mjs';
let agility = new Agility();

let url = '/v1/api/inverterDetail';
let body ={
  sn: agility.solis.inverterSn
};
let resp = await agility.solis.api(url, body);

let stationId = resp.data.stationId;

console.log('++++++++++');
console.log('stationId: ' + stationId);
console.log('++++++++++');

url = '/v1/api/collectorList';
body ={
  stationId: stationId
};
resp = await agility.solis.api(url, body);

for (let record of resp.data.page.records) {
  console.log('dataLogger: ' + record.monitorModel);
}

agility.glsdb.close();









