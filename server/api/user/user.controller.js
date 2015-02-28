'use strict';

var _ = require('lodash');
var uuid = require('node-uuid');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

var config = require('../../config/environment');
var User = require('./user.model');
var Link = require('../link/link.model');

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
    user.save();

    Link.create({ src: uuid.v4().split('-')[0], dst: 'http://fugitive.link/auth/' + user.uuid }, function (err, link) {

      if (err || !link) { return res.status(400).end(); }

      nodemailer.createTransport().sendMail({
        from: 'lognup@fugitive.link',
        to: user.email,
        subject: '[Fugitive] Authentication',
        html: 'Hello, follow <a href="http://fugitive.link/' + link.src + '">this link</a> to get on tracks.'
      });

      res.status(200).end();

    });
  }

  if (!req.body.email) { return res.status(400).end(); }

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

  console.log(req.user)

  User.findById(req.user._id, function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).end(); }
    user.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });

};
