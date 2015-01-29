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

  app.post('/lognup', user.lognup);

  app.post('/auth', user.auth);
  app.post('/create', link.create);

  // API
  app.use('/api/links', require('./api/link'));
  app.use('/api/users', require('./api/user'));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  app.get('/auth/:token', rootPageMiddleware);

  app.route('/*')
    .get(function (req, res) {
      Link.findOne({ src: req.originalUrl.substr(1) }, function (err, link) {
        if (err || !link) { return res.redirect('/'); } // TODO 404 page
        res.redirect(link.dst);
        // delete
      });
    });

};
