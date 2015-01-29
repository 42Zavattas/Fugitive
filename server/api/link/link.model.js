'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
  src: String,
  dst: String,
  user: { type: Schema.ObjectId, ref: 'User', default: null }
});

module.exports = mongoose.model('Link', LinkSchema);
