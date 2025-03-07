import {Agility} from '/opt/agility/mapped/agility.mjs';

let agility = new Agility();


function averagePowerBetween(from, to) {
    from = from || '00:00';
    to = to || '23:59';
    let totalLoad = 0;
    let totalPV = 0;
    let offset = 0;
    let count = 0;
    let _this = this;
    if (!this.data.exists) {
      return {
        load: 0,
        pv: 0
      };
    }
    let lc = this.data.lastChild;
    let key;
    if (lc && lc.exists) {
      let ps = lc.previousSibling;
      if (ps && ps.exists) {
        key = ps.key
      }
    }
    if (!key) {
      return {
        load: 0,
        pv: 0
      };
    }
    let startDateIndex = key;
    this.data.forEachChildNode({direction: 'reverse', from: startDateIndex}, function(dateNode) {
      offset--;
      count++;
      console.log('from = ' + from + '; offset = ' + offset);
      let data = _this.getDataAt(from, offset);
      console.log('from: ' + data.at);
      let startLoad = data.houseLoadTotal;
      let startPV = data.pvOutputTotal;
      console.log('startPV: ' + startPV);
      data = _this.getDataAt(to, offset);
      console.log('to: ' + data.at);
      let endLoad = data.houseLoadTotal;
      let endPV = data.pvOutputTotal;
      console.log('endPV: ' + endPV);
      let totalDayLoad = endLoad - startLoad;
      let totalDayPV = endPV - startPV;
      totalLoad += totalDayLoad;
      totalPV += totalDayPV;
      console.log('total load for day: ' + totalDayLoad);
      console.log('total PV for day: ' + totalDayPV);
      console.log('--------');
    });
    console.log('grand totalLoad: ' + totalLoad + '; total days: ' + count);
    console.log('grand totalPV: ' + totalPV + '; total days: ' + count);
    let aveLoad = totalLoad / count;
    let avePV = totalPV / count;
    return {
      load: aveLoad,
      pv: avePV
    };
}

let now = agility.date.now();
let res = averagePowerBetween.call(agility.solis, now.slotTimeText, '23:50');
console.log(res);

console.log('++++++++++++++++++++');

res = averagePowerBetween.call(agility.solis, '00:01', '04:00');
console.log(res);


agility.glsdb.close();
