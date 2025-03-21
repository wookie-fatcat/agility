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


/*
Geoff's Data Logger:
++++++++++
stationId: 1298491919448725349
++++++++++
dataLogger: GL-WIFI-EN-DWG-021


The latest reply from HQ:
The system requires two API calls.
After sending the atRead command, you will receive an orderId in the reply.
Use this orderId in a second API call to https://api.ginlong.com:13333/v2/api/result to retrieve the result.

{
  success: true,
  code: "0",
  data: {
    msg: "44458476",
    code: 0,
    needLoop: true,
  },
}



*/








