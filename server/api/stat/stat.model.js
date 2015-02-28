'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatSchema = new Schema({
  count: Number
});

module.exports = mongoose.model('Statistic', StatSchema);
