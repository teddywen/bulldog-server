/**
 * Created by wen.xiang on 16/10/9.
 */
module.exports = function(app) {
  var bearcat = app.get('bearcat');
  if (!bearcat) {
    return null;
  }

  return bearcat.getBean({
    id: 'authRemote',
    func: AuthRemote,
    args: [{
      name: 'app',
      value: app
    }]
  });
};

var AuthRemote = function(app) {
  this._app = app;
};

var prototype = AuthRemote.prototype;

/**
 * 生成一个游客账号并返回accessToken
 *
 * @param {Function} cb
 * @return {void}
 */
prototype.generateGuestAndToken = function(cb) {
  cb({
    ok: true,
    accessToken: mockTokens.guest
  });
};

/**
 * 获取微信账号accessToken
 *
 * @param {String} openid
 * @param {Function} cb
 * @return {void}
 */
prototype.queryTokenWithOpenid = function (openid, cb) {
  if (!openid) {
    cb({ok: false});
    return;
  }
  cb({
    ok: true,
    accessToken: mockTokens.wechat
  });
};


/**
 * 获取微信账号accessToken
 *
 * @param {String} token
 * @param {Function} cb
 * @return {void}
 */
prototype.auth = function (token, cb) {
  var uid = 0;
  if (mockTokens.guest == token) {
    uid = 1;
  } else if (mockTokens.wechat == token) {
    uid = 2;
  }
  cb({
    ok: true,
    uid: uid
  });
};

var mockTokens = {
  guest: 'abcdefghijklmnopqrstuvwxyz',
  wechat: 'zyxwvutsrqponmlkihgfedcba'
};