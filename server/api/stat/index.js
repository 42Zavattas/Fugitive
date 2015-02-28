'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./stat.controller');

router.get('/', controller.index);

module.exports = router;
