'use strict';

var express = require('express');
var chalk = require('chalk');
var config = require('./config/environment');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function () {

  console.log(
    chalk.red('\nExpress server listening on port ') +
    chalk.yellow('%d') +
    chalk.red(', in ') +
    chalk.yellow('%s') +
    chalk.red(' mode.\n'),
    config.port,
    app.get('env')
  );

});

// Deployment

var githubhook = require('githubhook');
var github = githubhook({
  path   : '/deploy',
  secret : process.env.FUGITIVE_SECRET || 'yolo'
});

github.listen();

github.on('push:Fugitive', function (repo, ref, data) {
  var deploy = require('./deploy')();
  deploy.stdout.on('data', function (data) {
    console.log(String(data));
  });
  deploy.stderr.on('data', function (data) {
    console.log(chalk.red(data));
  });
  deploy.on('exit', function (code) {
    console.log(chalk.blue('Deploy end with code [' + code + ']'));
  });
});

module.exports = server;
