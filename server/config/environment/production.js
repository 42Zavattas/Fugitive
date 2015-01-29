'use strict';

module.exports = {
  ip : process.env.IP || undefined,
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
        'mongodb://localhost/fugitive'
  }
};
