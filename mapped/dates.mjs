/*

 ----------------------------------------------------------------------------
 | Agility: Solar Battery Optimisation against Octopus Agile Tariff          |
 |           specifically for Solis Inverters                                |
 |                                                                           |
 | Copyright (c) 2024-25 MGateway Ltd,                                       |
 | Redhill, Surrey UK.                                                       |
 | All rights reserved.                                                      |
 |                                                                           |
 | https://www.mgateway.com                                                  |
 | Email: rtweed@mgateway.com                                                |
 |                                                                           |
 |                                                                           |
 | Licensed under the Apache License, Version 2.0 (the "License");           |
 | you may not use this file except in compliance with the License.          |
 | You may obtain a copy of the License at                                   |
 |                                                                           |
 |     http://www.apache.org/licenses/LICENSE-2.0                            |
 |                                                                           |
 | Unless required by applicable law or agreed to in writing, software       |
 | distributed under the License is distributed on an "AS IS" BASIS,         |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  |
 | See the License for the specific language governing permissions and       |
 |  limitations under the License.                                           |
 ----------------------------------------------------------------------------

 31 March 2025

*/

function parseDate(date) {
  let time = date.getTime();
  let day = date.getDate();
  let dayText = day.toString();
  if (day < 10) dayText = '0' + dayText;
  let month = date.getMonth() + 1;
  let monthText = month.toString();
  if (month < 10) monthText = '0' + monthText;
  const year = date.getFullYear();
  let hr = date.getHours();
  let hrText = hr.toString();
  if (hr < 10) hrText = '0' + hr;
  let min = date.getMinutes();
  let minText = min.toString();
  if (min < 10) minText = '0' + min;
  let timeStr = hrText + ':' + minText;
  let sec = date.getSeconds();
  let secText = sec.toString();
  if (sec < 10) secText = '0' + secText;
  let fullTimeStr = timeStr + ':' + secText;
  let tzOffset = date.getTimezoneOffset();
  let daylightSaving = (tzOffset < 0);
  let midnightIndex = new Date(+time).setHours(0, 0, 0, 0);
  let slotMin = 0;
  let slotMinText = '00';
  if (min > 29) {
    slotMin = 30;
    slotMinText = '30';
  }
  let slotTimeText = hrText + ':' + slotMinText;
  let slotTime = new Date(+new Date(time).setHours(hr, slotMin, 0, 0));
  let slotTimeIndex = slotTime.getTime();
  return {
    timeIndex: +time,
    midnightIndex: midnightIndex,
    dateIndex: midnightIndex,
    slotTimeIndex: slotTimeIndex,
    slotTimeText: slotTimeText,
    slotEndTimeIndex: slotTimeIndex + 1800000,
    previousSlotTimeIndex: slotTimeIndex - 1800000,
    year: year,
    month: month,
    monthText: monthText,
    day: day,
    dayText: dayText,
    hour: hr,
    hourText: hrText,
    minute: min,
    minuteText: minText,
    second: sec,
    secondText: secText,
    timeText: timeStr,
    fullTimeText: fullTimeStr,
    daylightSaving: daylightSaving
  }
}

function isNumeric(string){
  return !isNaN(string);
}

let offset = function(str) {
  let targetDate = at(str);
  let targetMidnight = new Date(targetDate.timeIndex).setHours(0, 0, 0, 0);
  let nowMidnight = atMidnight();
  return nowMidnight.timeIndex - targetMidnight;
}

let atTime = function(time, timeIndex) {
  // time format hh:mm
  time = time || '00:00';
  let pcs = time.split(':');
  let hr = +pcs[0];
  let min = +pcs[1];
  timeIndex = timeIndex || now().timeIndex;
  let date = new Date(+new Date(timeIndex).setHours(hr, min, 0, 0));
  return parseDate(date);
}

let atMidnight = function(offset) {
  offset = offset || 0;
  let date = new Date();
  if (offset === 0) {
    date = date.setHours(0, 0, 0, 0);
    date = new Date(date);
    return parseDate(date);
  }
  let daylightSavingNow = date.getTimezoneOffset() < 0;
  let t12 = date.setHours(12, 0, 0, 0);
  date = new Date(t12);
  t12 = date.getTime();
  let t = t12 + (offset * 86400000);
  date = new Date(t);
  let daylightSavingThen = date.getTimezoneOffset() < 0;
  if (daylightSavingNow && !daylightSavingThen) {
    date = date.setHours(23, 0, 0, 0);
    date = new Date(date);
  }
  if (!daylightSavingNow && daylightSavingThen) {
    date = date.setHours(1, 0, 0, 0);
    date = new Date(date);
  }
  date = date.setHours(0, 0, 0, 0);
  date = new Date(date);
  //let date = new Date(+new Date().setHours(0, 0, 0, 0)  + (offset * 86400000));
  return parseDate(date);
}

let now = function() {
  return parseDate(new Date());
}

let at = function(str) {
  if (isNumeric(str)) str = +str;
  return parseDate(new Date(str));
}


let date = {
  atMidnight: atMidnight,
  now: now,
  at: at,
  atTime: atTime,
  offset: offset
}


export {date};
