'use strict';

var config = require('./config/environment');
var user = require('./api/user/user.controller');
var link = require('./api/link/link.controller');

module.exports = function (app) {

  app.post('/lognup', user.lognup);
  //app.post('/create', link.create);

  // API
  app.use('/api/links', require('./api/link'));
  app.use('/api/users', require('./api/user'));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  app.route('/*')
    .get(function (req, res) {
      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: config.root }
      );
    });

};
