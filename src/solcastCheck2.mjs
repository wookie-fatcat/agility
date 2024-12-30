import {Agility} from './agility.mjs';

let agility = new Agility();

let res = agility.solcast.expectedTotalPower();
console.log(res);

console.log('expected power for current slot: ' + agility.solcast.currentSlotPower)
