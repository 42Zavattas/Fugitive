'use strict';

var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  uuid: { type: String, default: uuid.v4() }
});

module.exports = mongoose.model('User', UserSchema);
