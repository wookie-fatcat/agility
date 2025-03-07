import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

//agility.exec('git clone https://github.com/robtweed/agility /opt/copy');

agility.exec('/opt/agility/nginx reload');


agility.glsdb.close();