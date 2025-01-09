import {Router} from 'mgw-router';
import {Agility} from '../agility.mjs';
let agility = new Agility();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let router = new Router({logging: true});

router.get('/agility/helloworld', (Request, ctx) => {

  return {
    payload: {
      hello: 'Hello from Agility!',
      name: agility.name,
      version: agility.version
    }
  };

});

router.get('/agility/isRunning', (Request, ctx) => {

  let isRunning = true;
  if (!agility.isAlreadyRunning) {
    isRunning = false;
    agility.releaseLock();
  }

  return {
    payload: {
      isRunning: isRunning
    }
  };

});

router.get('/agility/start', async (Request, ctx) => {

  if (agility.isAlreadyRunning) {
    return {
      payload: {
        error: 'Agility is already running'
      }
    };
  }
  else {
    agility.releaseLock();
  }

  console.log('Agility requested to start');
  agility.exec('/opt/agility/mapped/control/start');
  await sleep(2000);

  if (!agility.isAlreadyRunning) {
    agility.releaseLock();
    return {
      payload: {
        error: 'Agility was unable to start: check the log for details'
      }
    }
  }
  else {
    return {
      payload: {
        ok: true
      }
    }
  }

});

router.get('/agility/stop', async (Request, ctx) => {

  if (!agility.isAlreadyRunning) {
    agility.releaseLock();
    return {
      payload: {
        error: 'Agility is not running'
      }
    };
  }

  agility.stop();

  return {
    payload: {
      ok: true
    }
  };

});

router.get('/agility/solcast/isenabled', (Request, ctx) => {

  return {
    payload: {
      configured: agility.solcast.isConfigured,
      enabled: agility.solcast.isEnabled
    }
  };

});

router.get('/agility/solcast/enable', (Request, ctx) => {

  agility.solcast.enable();

  return {
    payload: {
      ok: true
    }
  };

});

router.get('/agility/solcast/disable', (Request, ctx) => {

  agility.solcast.disable();

  return {
    payload: {
      ok: true
    }
  };

});

router.get('/agility/config/:category', (Request, ctx) => {
  let allowed = ['solisCloud', 'solcast', 'octopus', 'battery', 'operation'];
  let category = Request.params.category;
  if (!allowed.includes(category)) {
    return {
      payload: {
        error: 'invalid category: ' + category
      }
    };
  }

  let data = {};
  if (agility.config.$(category).exists) {
    data = agility.config.$(category).document;
  }
  if (category === 'solcast') {
    if (!data.endpoint) data.endpoint = '';
    if (!data.key) data.key = '';
  }

  return {
    payload: {
      data: data
    }
  }
});

router.post('/agility/config/:category', (Request, ctx) => {
  //let allowed = ['solisCloud', 'solcast', 'octopus', 'battery', 'operation'];
  let fieldNames = {
    solisCloud: ['endpoint', 'key', 'secret', 'inverterSn'],
    octopus: ['zone', 'url1', 'url2'],
    battery: ['storage', 'chargeCurrent', 'dischargeCurrent', 'chargeLimit', 'minimumLevel'],
    solcast: ['endpoint', 'key'],
    operation: ['alwaysUseSlotPrice', 'movingAveragePeriod']
  };

  let category = Request.params.category;
  if (!fieldNames[category]) {
    return {
      payload: {
        error: 'invalid category: ' + category
      }
    };
  }

  let error;
  let data = {};
  let body = Request.body;

  for (let name of fieldNames[category]) {
    if (!body[name]) {
      error = name + ' must not be an empty value';
      break;
    }
    if (body[name] === '') {
      error = name + ' is empty';
      break;
    }
    let value = body[name];
    if (category === 'solisCloud' && name === 'endpoint' && !value.startsWith('http')) {
      error = 'Invalid endpoint';
      break;
    }
    if (category === 'octopus' && name === 'zone') {
      let validzones = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P'];
      if (!validzones.includes(value)) {
        error = 'Invalid DNO zone';
        break;
      }
    }
    if (category === 'battery') {
      value = +value;
      if (!Number.isInteger(value)) {
        error = name + ' must be a numeric (integer) value';
        break;
      }
      if (value < 0 || value > 100) {
        error = name + ' must be between 0 and 100';
        break;
      }
    }
    if (category === 'operation') {
      value = +value;
      if (name === 'movingAveragePeriod' && !Number.isInteger(value)) {
        error = name + ' must be a numeric (integer) value';
        break;
      }
      if (name === 'alwaysUseSlotPrice' && !Number.isFinite(value)) {
        error = name + ' must be a numeric value';
        break;
      }

    }

    data[name] = value;
  }
  if (error) {
    return {
      payload: {
        error: error
      }
    };
  }

  agility.config.$(category).document = data;

  return {
    payload: {
      ok: true
    }
  }
});

router.get('/agility/closeSSE/:pid', async (Request, ctx) => {

  let sseDoc = new agility.glsdb.node('agilitySSE.byPid');
  sseDoc.$(Request.params.pid).delete();

  return {
    payload: {
      ok: true
    }
  };

});


router.sse('/agility/sse', function(ws, ctx)  {

  console.log('in sse handler');
  console.log(ws);
  ws.write('data:server_process:' + process.pid + '\r\n\r\n');
  
  let sseDoc = new agility.glsdb.node('agilitySSE.byPid');
  sseDoc.$(process.pid).value = Date.now();
  let lastKey = 0;
  let timeout;

  let now = agility.date.now();

  function displayNextLogRecords(lastKey) {
    console.log('starting at ' + lastKey);
    agility.logger.logDoc.$(now.dateIndex).forEachChildNode({from: lastKey + 1}, function(node) {
      if (node.key !== 'counter') {
        lastKey = +node.key;
        ws.write('data:' + agility.logger.displayFormat(now.dateIndex, node.key) + '\r\n\r\n');
      }
    });
    return lastKey;
  }

  lastKey = displayNextLogRecords(lastKey);
  console.log('lastKey is now ' + lastKey);

  let fn = function() {
    //get any new records and display them...
    console.log('SIGHUP!');
    lastKey = displayNextLogRecords(lastKey);
    console.log('lastKey is now ' + lastKey);
  };

  process.on('SIGHUP', fn);

  let interval = setInterval(function() {
    if (!sseDoc.$(process.pid).exists) {
      console.log('SSE connection closed');
      process.removeListener('SIGHUP', fn);
      clearTimeout(timeout);
      ws.close();
      clearInterval(interval);
    }
    else {
      ws.write('data:keepalive\r\n\r\n');
    }
  }, 15000);

  timeout = setTimeout(function() {
    sseDoc.$(process.pid).delete();
  }, 360000)

  return {
    payload: {
      ok: true
    }
  };

});


let handler = router.handler();

export {handler};