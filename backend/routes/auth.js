const express = require('express');
const passport = require('passport');
const { validateWebhook, validateSignature } = require('twitter-autohook');
const url = require('url');

const { decrypt } = require('../utils/crypto');
const router = express.Router();

router.get('/twitter', passport.authenticate('twitter'));

router.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    session: true,
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

router.get('/twitter/webhook', function(req, res, next) {
  if (req.query.crc_token) {
    console.log('Log: req.query.crc_token', req.query.crc_token);
    console.log('Log: req.user', req.user);
    let auth;
    try {
      auth = {
        token: decrypt(req.user.token),
        token_secret: decrypt(req.user.tokenSecret),
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        env: process.env.TWITTER_WEBHOOK_ENV,
      };
    } catch (error) {
      console.log('Log: error auth', error);
    }
    try {
      console.log('Log: validateSignature');
      if (!validateSignature(req.headers, auth, url.parse(req.url).query)) {
        console.log('Log: validateSignature error');
        throw new Error('Cannot validate webhook signature');
      }
    } catch (e) {
      console.error('Cannot validate webhook signature');
      console.error(e);
      return next(e);
    }

    console.log('Log: validateWebhook');
    const crc = validateWebhook(req.query.crc_token, auth, res);
    res.json(JSON.stringify(crc));
  } else {
    res.end();
  }
});

router.post('/twitter/webhook', function(req, res, next) {
  const auth = {
    token: decrypt(req.user.token),
    token_secret: decrypt(req.user.tokenSecret),
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    env: process.env.TWITTER_WEBHOOK_ENV,
  };
  try {
    if (!validateSignature(req.headers, auth, req.body)) {
      console.error('Cannot validate webhook signature');
      throw new Error('Cannot validate webhook signature');
    }
  } catch (e) {
    console.error(e);
    return next(e);
  }
  console.log('Event received:', body);
  es.status(200).end();
});

module.exports = router;
