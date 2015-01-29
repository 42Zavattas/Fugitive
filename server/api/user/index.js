'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

router.post('/', controller.lognup);

router.delete('/', controller.destroy);

module.exports = router;
