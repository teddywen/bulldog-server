var bearcat = require('bearcat');
var pomelo = require('pomelo');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
/**
 * Setup app function
 */
var configure = function () {
  // set app name
  app.set('name', 'bulldog-server');

  // set connector config
  app.configure('production|development', 'gate', function () {
    app.set('connectorConfig',
      {
        connector: pomelo.connectors.hybridconnector
      });
  });
  app.configure('production|development', 'connector', function () {
    app.set('connectorConfig',
      {
        connector: pomelo.connectors.hybridconnector,
        heartbeat: 3,
        useDict: true,
        useProtobuf: true
      });
  });
};

/**
 * bearcat
 */
var contextPath = require.resolve('./context.json');
bearcat.createApp([contextPath]);
bearcat.start(function () {
  configure();
  app.set('bearcat', bearcat);
  // start app
  app.start();
});

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
