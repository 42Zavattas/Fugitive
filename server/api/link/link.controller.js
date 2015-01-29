'use strict';

var _ = require('lodash');
var Link = require('./link.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of links
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Link.find(function (err, links) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(links);
  });
};

/**
 * Get a single link
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Link.findById(req.params.id, function (err, link) {
    if (err) { return handleError(res, err); }
    if (!link) { return res.status(404); }
    return res.status(200).json(link);
  });
};

/**
 * Creates a new link in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Link.create(req.body, function (err, link) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(link);
  });
};

/**
 * Updates an existing link in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Link.findById(req.params.id, function (err, link) {
    if (err) { return handleError(res, err); }
    if (!link) { return res.status(404); }
    var updated = _.merge(link, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(link);
    });
  });
};

/**
 * Deletes a link from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Link.findById(req.params.id, function (err, link) {
    if (err) { return handleError(res, err); }
    if (!link) { return res.status(404); }
    link.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204);
    });
  });
};
