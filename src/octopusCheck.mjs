import {Agility} from './agility.mjs';

let agility = new Agility();

/*
let json = await agility.octopus.fetchTariff();
console.log(json);

for (let slot of json.results) {
  let slotTime = agility.date.at(slot.valid_from);
  let dateIndex = slotTime.midnightIndex;
  let timeIndex = slotTime.timeIndex;
  console.log(dateIndex + ': ' + timeIndex + ': ' + slot.valid_from);
}
*/


let res = await agility.octopus.getLatestTariffTable()
console.log(res);

res = agility.octopus.lastSlot;
console.log(res);

res = agility.octopus.useCurrentSlotOf(9);
console.log(res);

agility.movingAveragePeriod = 14;

console.log('moving average days: ' + agility.movingAveragePeriod);





