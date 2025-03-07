import {Agility} from '/opt/agility/mapped/agility.mjs';
let agility = new Agility();
let url = '/v2/api/atRead';
let body ={
  inverterSn: agility.solis.inverterSn,
  //cid: 636
  cid: 4643
};
let resp = await agility.solis.api(url, body);
console.log(resp);

/*
url = '/v2/api/result';
body = {
  orderId: resp.orderId
}

let resp2 = await agility.solis.api(url, body);
console.log(resp2);
*/

agility.glsdb.close();