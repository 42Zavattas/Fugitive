'use strict';

module.exports = {
  ip : process.env.IP || undefined,
  port: 4567,
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
        'mongodb://localhost/fugitive'
  }
};
