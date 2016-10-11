/**
 * Created by wen.xiang on 16/10/9.
 */
var ACCUMULATE_LIMIT = Number.MAX_VALUE;
var DEFAULT_START = 0;

var Accumulator = function (limit, start) {
  this.$id = 'accumulator';
  this.$scope = 'prototype';
  this.$args = [
    {
      name: 'limit',
      type: 'Number'
    },
    {
      name: 'start',
      type: 'Number'
    }
  ];

  this._limit = limit || ACCUMULATE_LIMIT;
  this._count = this._start = start || DEFAULT_START;
};

module.exports = Accumulator;

var prototype = Accumulator.prototype;

/**
 * 获取并累加
 *
 * @returns {Number}
 */
prototype.get = function () {
  if (this._count == this._limit) {
    this._count = this._start;
    return this._limit;
  } else {
    return this._count++;
  }
};

/**
 * 重置累加数字
 *
 * @returns {number}
 */
prototype.reset = function () {
  this._count = this._start;
  return this._count;
};