import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();
agility.stop();
agility.waitUntilStopped();
agility.glsdb.close();

