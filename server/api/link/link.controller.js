'use strict';

var _ = require('lodash');
var uuid = require('node-uuid');

var maxmind = require('maxmind');
maxmind.init(__dirname + '/geo.dat');

var Link = require('./link.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.reroute = function (req, res) {
  Link.findOne({ src: req.originalUrl.substr(1) }, function (err, link) {
    if (err || !link) { return res.redirect('/404'); }
    if (!link.user) {
      res.redirect(link.dst);
      link.remove();
    } else {

      var dest = link.dst;


      if (link.num === 0 || (link.exp && new Date().getTime() > link.exp)) {

        // The link is expired, delete or redirect if set
        if (link.rpl) {
          dest = link.rpl;
        } else {
          link.remove();
          return res.redirect('/404');
        }

      } else {

        if (link.num !== -1) {
          link.num--;
          link.save();
        }

        console.log('IP === ', req.ip);

        // Not expired, but will apply some cool features?

        if (link.geo && link.geo.length) {
          console.log('GEO MODE');
          var country = maxmind.getCountry(req.ip);
          link.geo.forEach(function (e) {
            if (country === e.country) {
              dest = e.rpl;
              console.log('Country detected ' + e.country);
              return ;
            }
          });
        }

      }

      res.redirect(dest);

    }
  });
};

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
    return res.send(400).end();
  }

  if (req.body.exp) { delete req.body.exp; }

  if ((!req.body.num || req.body.num < 1) && (!req.body.time || req.body.time === 'none')) {
    req.body.num = 1;
  }

  if (req.user && req.user._id) {
    req.body.user = req.user._id;
    if (req.body.time !== 'none') {
      if (['5', '30', '60', '1440', '10080'].indexOf(req.body.time) === -1 || typeof req.body.time !== 'string') {
        return res.status(400).end();
      }
      var date = new Date();
      date.setTime(date.getTime() + (parseInt(req.body.time) * 60000));
      req.body.exp = date.getTime();
    }
  }

  req.body.src = uuid.v4().split('-')[0];

  if (!req.body.dst.match(/^[a-zA-Z]+:\/\//)) {
    req.body.dst = 'http://' + req.body.dst;
  }

  Link.create(req.body, function (err, link) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(link);
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
    if (link.user.toString() !== req.user._id) { return res.status(401).end(); }

    link.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });

  });
};
