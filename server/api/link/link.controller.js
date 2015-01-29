'use strict';

var _ = require('lodash');
var uuid = require('node-uuid');
var Link = require('./link.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * Get my links
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Link.find({ user: req.user._id }, function (err, links) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(links);
  });
};


/**
 * Creates a new link in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {

  if (!req.body.dst) {
    return res.send(500).end();
  }

  if (req.user && req.user._id) {
    req.body.user = req.user._id;
  }

  req.body.src = uuid.v4().split('-')[0];

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
    if (!link) { return res.status(404).end(); }
    if (link.user !== req.user._id) { return res.status(401).end(); }

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
    if (!link) { return res.status(404).end(); }
    if (link.user !== req.user._id) { return res.status(401).end(); }
    link.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204);
    });
  });
};
