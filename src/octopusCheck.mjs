import {Agility} from './agility.mjs';

let agility = new Agility();


console.log('This will check whether Agility can download the Octopus Agile Tariff Tables');
console.log('If successful, it will display the raw JSON data');

let json = await agility.octopus.fetchTariff();
console.log(json);






