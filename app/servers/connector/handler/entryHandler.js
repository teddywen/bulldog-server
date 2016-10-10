module.exports = function(app) {
  return new EntryHandler(app);
};

var EntryHandler = function(app) {
  this._app = app;
};

var prototype = EntryHandler.prototype;

/**
 * 游客授权 获得accessToken
 *
 * @param {Object} msg
 * @param {Object} session
 * @param {Function} next
 * @return {void}
 */
prototype.authAsGuest = function (msg, session, next) {
  this._app.rpc.auth.authRemote.generateGuestAndToken(session, function (res) {
    if (res.ok) {
      next(null, {code: 200, accessToken: res.accessToken});
    } else {
      next(null, {code: 500, msg: 'Generate guest account failed.'});
    }
  });
};

/**
 * 微信授权 获得accessToken
 *
 * @param {Object} msg
 * @param {Object} session
 * @param {Function} next
 * @return {void}
 */
prototype.authWithOpenid = function (msg, session, next) {
  if (!msg.hasOwnProperty('openid')) {
    next(null, {code: 500, msg: 'Param openid is missing.'});
    return;
  }
  this._app.rpc.auth.authRemote.queryTokenWithOpenid(session, msg.openid, function (res) {
    if (res.ok) {
      next(null, {code: 200, accessToken: res.accessToken});
    } else {
      next(null, {code: 500, msg: 'Query wechat account access token failed.'});
    }
  });
};

/**
 * 登录
 *
 * @param {Object} msg
 * @param {Object} session
 * @param {Function} next
 * @return {void}
 */
prototype.login = function (msg, session, next) {
  if (!msg.hasOwnProperty('accessToken')) {
    next(null, {
      code: 500,
      msg: 'Lost access token.'
    });
    return;
  }
};