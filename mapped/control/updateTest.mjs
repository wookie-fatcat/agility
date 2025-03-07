import {Agility} from '/opt/agility/mapped/agility.mjs';
import fs from 'fs';

let agility = new Agility();

let copyDir = '/opt/copy';
if (fs.existsSync(copyDir)) {
  fs.rmdirSync(copyDir, { 
    recursive: true
  }); 
}
fs.mkdirSync(copyDir);
agility.exec('git clone https://github.com/robtweed/agility ' + copyDir);

let fileArr = fs.readdirSync(copyDir + '/mapped');
for (let filename of fileArr) {
  if (filename.endsWith('.mjs') || filename === 'version.json') {
    fs.copyFileSync(copyDir + '/mapped/' + filename, '/opt/agility/mapped/' + filename);
  }
}

fileArr = fs.readdirSync(copyDir + '/mapped/www');
for (let filename of fileArr) {
  if (filename.endsWith('.html') || filename.endsWith('.ico')) {
    fs.copyFileSync(copyDir + '/mapped/www/' + filename, '/opt/agility/mapped/www/' + filename);
  }
}

fileArr = fs.readdirSync(copyDir + '/mapped/www/js');
for (let filename of fileArr) {
  if (filename.endsWith('.js')) {
    fs.copyFileSync(copyDir + '/mapped/www/js/' + filename, '/opt/agility/mapped/www/js/' + filename);
  }
}

fileArr = fs.readdirSync(copyDir + '/mapped/www/js/components/sbadmin');
for (let filename of fileArr) {
  if (filename.endsWith('.js')) {
    fs.copyFileSync(copyDir + '/mapped/www/js/components/sbadmin/' + filename, '/opt/agility/mapped/www/js/components/sbadmin/' + filename);
  }
}

fileArr = fs.readdirSync(copyDir + '/mapped/www/js/assemblies');
for (let filename of fileArr) {
  if (filename.endsWith('.js')) {
    fs.copyFileSync(copyDir + '/mapped/www/js/assemblies/' + filename, '/opt/agility/mapped/www/js/assemblies/' + filename);
  }
}

fileArr = fs.readdirSync(copyDir + '/mapped/mgweb');
for (let filename of fileArr) {
  if (filename.endsWith('.mjs')) {
    fs.copyFileSync(copyDir + '/mapped/mgweb/' + filename, '/opt/agility/mapped/mgweb/' + filename);
  }
}

fs.rmdirSync(copyDir, { 
  recursive: true
});

agility.exec('/opt/agility/nginx reload');

agility.glsdb.close();