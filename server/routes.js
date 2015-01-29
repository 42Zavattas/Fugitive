'use strict';

var config = require('./config/environment');

module.exports = function (app) {

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
