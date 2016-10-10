/**
 * Created by wen.xiang on 16/10/9.
 */
var crc = require('crc');

var Utils = {};

module.exports = Utils;

/**
 * round robin循环算法
 *
 * @param {String|Number} id
 * @param {Array} servers
 * @returns {Object|null}
 */
Utils.roundRobin = function (id, servers) {
  if (Array.isArray(servers)) {
    var number = isNaN(id) ? crc.crc32(id) : Math.floor(id);
    var index = Math.abs(number) % servers.length;
    return servers[index];
  } else {
    return null;
  }
};