'use strict';

var config = require('./config/environment');
var user = require('./api/user/user.controller');
var link = require('./api/link/link.controller');

var Link = require('./api/link/link.model');

module.exports = function (app) {

  var rootPageMiddleware = function (req, res) {
    res.sendFile(
      app.get('appPath') + '/index.html',
      { root: config.root }
    );
  };

  app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
  });

  app.post('/lognup', user.lognup);

  app.post('/auth', user.auth);
  app.post('/create', link.create);

  // API
  app.use('/api/stats', require('./api/stat'));
  app.use('/api/links', require('./api/link'));
  app.use('/api/users', require('./api/user'));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  ['/auth/:token', '/lognup', '/404', '/profile'].forEach(function (e) {
    app.get(e, rootPageMiddleware);
  });

  app.route('/*').get(link.reroute);

};
