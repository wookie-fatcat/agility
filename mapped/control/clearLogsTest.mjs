import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();

agility.exec('/opt/agility/mapped/control/clearLogs');

agility.glsdb.close();
