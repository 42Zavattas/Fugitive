'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  uuid: { type: String, default: '' }
});

module.exports = mongoose.model('User', UserSchema);
