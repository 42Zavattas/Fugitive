'use strict';

var _ = require('lodash');
var Stat = require('./stat.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get stats
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Stat.findOne({}, function (err, stat) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(stat);
  });
};
