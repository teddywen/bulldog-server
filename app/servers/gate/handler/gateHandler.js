/**
 * Created by wen.xiang on 16/10/9.
 */
module.exports = function (app) {
  var bearcat = app.get('bearcat');
  if (!bearcat) {
    return null;
  }

  return bearcat.getBean({
    id: 'gateHandler',
    func: GateHandler,
    args: [{
      name: 'app',
      value: app
    }],
    props: [{
      name: '_accumulator',
      ref: 'accumulator'
    }, {
      name: '_utils',
      ref: 'utils'
    }]
  });
};

var GateHandler = function (app) {
  this._app = app;
  this._accumulator = null;
  this._utils = null;
}

var prototype = GateHandler.prototype;

/**
 * 分配前端服务器 返回地址和端口
 *
 * @param {Object} msg
 * @param {Object} session
 * @param {Function} next
 * @return {void}
 */
prototype.queryEntry = function (msg, session, next) {
  var id = this._accumulator.get();
  var connectors = this._app.getServersByType('connector');

  if (!connectors || connectors.length === 0) {
    next(null, {code: 500, msg: 'Connector server not found.'});
    return;
  }

  var connector = this._utils.roundRobin(id, connectors);
  if (!connector) {
    next(null, {code: 500, msg: 'Dispatch connector failed.'});
    return;
  }

  next(null, {
    code: 200,
    host: connector.host,
    port: connector.clientPort
  });
};