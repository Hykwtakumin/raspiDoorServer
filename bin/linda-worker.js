'use strict';
var LindaClient, base, config, debug, httpserver, path, scripts, socketio;

if (!process.env.DEBUG) {
  process.env.DEBUG = 'linda:worker*';
}

LindaClient = require('linda').Client;

socketio = require('socket.io-client');

debug = require('debug')('linda:worker');

path = require('path');

config = require(path.resolve('config.json'));

scripts = require(path.resolve('libs', 'scripts'));

httpserver = require(path.resolve('libs', 'httpserver'));

(base = config.linda).url || (base.url = process.env.URL);

debug(config);

//# Scripts
scripts.load(process.env.SCRIPT || '.+', function(err, scripts) {
  var i, len, linda, script, socket;
  socket = socketio.connect(config.linda.url);
  for (i = 0, len = scripts.length; i < len; i++) {
    script = scripts[i];
    debug(`load script "${script.name}"`);
    linda = new LindaClient().connect(socket);
    linda.config = config;
    linda.router = httpserver.router;
    linda.debug = require('debug')(`linda:worker:${script.name}`);
    script.function(linda);
  }
  linda = new LindaClient().connect(socket);
  linda.io.on('connect', function() {
    return debug(`socket.io connnect <${config.linda.url}>`);
  });
  return linda.io.on('disconnect', function() {
    return debug(`socket.io disconnect <${config.linda.url}>`);
  });
});

//# HTTP Server
httpserver.start(process.env.PORT || 3000);
