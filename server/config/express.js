'use strict';

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var device = require('express-device');

var config = require('./environment');

module.exports = function (app) {

  var env = config.env;

  app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(morgan('dev'));
  app.use(express.static(path.join(config.root, 'client')));
  app.set('appPath', 'client');
  app.enable('trust proxy'); // TODO should remove this if geo not working
  app.use(device.capture());

  app.use('/api', expressJwt({ secret: config.secret }));

  if ('development' === env || 'test' === env) {
    app.use(require('errorhandler')());
  }

};
