import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

console.log('Running: ' + agility.isAlreadyRunning);

let obj = agility.battery.availableSlotsByPrice(false);
console.log(obj);
console.log('------');
let done = false;
if (!obj.positionNow.chargingDecision.charge && obj.positionNow.chargingDecision.reason !== '') done = true;
if (obj.positionNow.chargingDecision.charge && obj.positionNow.chargingDecision.reason !== '') done = true;

if (!done) {
  let positionNow = agility.battery.shouldUseSlotToCharge(obj.positionNow, obj.slots, false);
  console.log(positionNow);
}

agility.glsdb.close();
