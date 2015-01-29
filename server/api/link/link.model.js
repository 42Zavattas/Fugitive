'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
  src : String,
  dst : String,
  user: { type: Schema.ObjectId, ref: 'User', default: null },
  exp : { type: Date, default: null },
  num : { type: Number, default: -1 },
  geo : [
    { country: String, rpl: String }
  ],
  rpl : String
});

module.exports = mongoose.model('Link', LinkSchema);
