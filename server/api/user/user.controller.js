'use strict';

var _ = require('lodash');
var uuid = require('node-uuid');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

var config = require('../../config/environment');
var User = require('./user.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * Authenticate a user
 *
 * @param req
 * @param res
 */
exports.auth = function (req, res) {
  User.findOne({ uuid: req.body.uuid }, function (err, user) {
    if (err || !user) { return res.redirect('/'); }

    res.json({ token : jwt.sign(user, config.secret, { expireInMinutes: 60 * 24 }) });
    user.uuid = '';
    user.save();
  });
};

/**
 * Creates or send email to user
 *
 * @param req
 * @param res
 */
exports.lognup = function (req, res) {

  function nexted (user) {
    user.uuid = uuid.v4();
    console.log(user.uuid);
    user.save();
    res.json(user.uuid);
    // Send mail
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) {
      User.create({ email: req.body.email }, function (err, user) {
        if (err) { return handleError(res, err); }
        nexted(user);
      });
    } else {
      nexted(user);
    }
  });
};

/**
 * Deletes me from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {

  User.findById(req.user._id, function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404); }
    user.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204);
    });
  });

};
