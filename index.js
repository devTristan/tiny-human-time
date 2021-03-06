'use strict';

const units = {
  long: ['in the future', 'just now', 'nanosecond', 'microsecond', 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'year'],
  short: ['soon', 'now', 'ns', 'μs', 'ms', 's', 'm', 'h', 'd', 'w', 'y']
};

function tinyHumanTime(t1, t2, u) {
  u = u || 'long';
  t1 = Array.isArray(t1) ? t1[0] * 1e3 + t1[1] / 1e6 : t1;
  t2 = Array.isArray(t2) ? t2[0] * 1e3 + t2[1] / 1e6 : t2;
  let milli = typeof t2 === 'undefined' ? t1 : Math.abs(t2 - t1);

  if (milli < 0)             return units[u][0];
  if (milli === 0)           return units[u][1];
  if (milli < 1e-3)          return format(Math.floor(milli * 1e6), units[u][2], u);
  if (milli < 1)             return format(Math.floor(milli * 1e3), units[u][3], u);
  if (milli < 1000)          return format(Math.floor(milli), units[u][4], u);
  if ((milli /= 1000) < 60)  return format(Math.floor(milli), units[u][5], u);
  if ((milli /= 60) < 60)    return format(Math.floor(milli), units[u][6], u);
  if ((milli /= 60) < 24)    return format(Math.floor(milli), units[u][7], u);
  if ((milli /= 24) < 7)     return format(Math.floor(milli), units[u][8], u);
  if ((milli /= 7) < 52)     return format(Math.floor(milli), units[u][9], u);
  return format(Math.floor(milli / 52), units[u][10], u);
}
tinyHumanTime.short = function short (t1, t2) {
  return tinyHumanTime(t1, t2, 'short');
};
module.exports = tinyHumanTime;

function format(n, unit, mode) {
  return `${n + (mode === 'short' ? '' : ' ')}${unit}${mode === 'short' || n === 1 ? '' : 's'}`;
}
