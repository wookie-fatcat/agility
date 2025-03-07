import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

agility.logger.write = console.log;
let res = agility.battery.shouldBeCharged;
console.log(res);