var bodyParser, debug, express, http, router;

debug = require('debug')('linda:worker:httpserver');

express = require('express');

bodyParser = require('body-parser');

router = express();

router.disable('x-powered-by');

router.use(bodyParser.urlencoded({
  extended: true
}));

http = require('http').Server(router);

router.get('/', function(err, res) {
  return res.end('linda-worker');
});

module.exports = {
  router: router,
  start: function(port) {
    http.listen(port);
    return debug(`start - port:${port}`);
  }
};
