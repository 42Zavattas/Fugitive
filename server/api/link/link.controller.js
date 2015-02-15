'use strict';

var _ = require('lodash');
var uuid = require('node-uuid');

var maxmind = require('maxmind');
maxmind.init(__dirname + '/geo.dat');

var Link = require('./link.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

function addHttp (url) {
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    url = 'http://' + url;
  }
  return url;
}

exports.reroute = function (req, res) {

  if (req.device.type === 'bot' || req.headers['user-agent'] === 'visionutils/0.2') {
    return res.redirect('http://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg');
  }

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
          if (link.num === 0 && !link.rpl) {
            link.remove();
          } else {
            link.save();
          }
        }

        if (link.geo && link.geo.length) {
          var country = maxmind.getCountry(req.ip).code;
          link.geo.forEach(function (e) {
            if (country === e.country) {
              dest = e.rpl;
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
    var now = new Date().getTime();
    var out = [];

    // Remove time expired links
    if (links && links.length) {
      links.forEach(function (e) {
        if (e.exp && e.exp < now) {
          e.remove();
        } else {
          out.push(e);
        }
      });
    }
    return res.status(200).json(out);
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
      req.body.num = -1;
      var date = new Date();
      date.setTime(date.getTime() + (parseInt(req.body.time) * 60000));
      req.body.exp = date.getTime();
    }
    if (req.body.geo) {
      req.body.geo.forEach(function (e) {
        e.rpl = addHttp(e.rpl);
      });
    }
    if (req.body.rpl) {
      req.body.rpl = addHttp(req.body.rpl);
    }
  } else {
    delete req.body.user;
    delete req.body.num;
    delete req.body.geo;
    delete req.body.rpl;
  }

  req.body.src = uuid.v4().split('-')[0];

  req.body.dst = addHttp(req.body.dst);

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
