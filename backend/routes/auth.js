const express = require('express');
const passport = require('passport');
const { validateWebhook, validateSignature } = require('twitter-autohook');
const url = require('url');

const router = express.Router();

const auth = {
  token: process.env.TWITTER_ACCESS_TOKEN,
  token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  env: process.env.TWITTER_WEBHOOK_ENV,
};

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
  try {
    if (!validateSignature(req.headers, auth, url.parse(req.url).query)) {
      throw new Error('Cannot validate webhook signature');
    }
  } catch (e) {
    console.error(e);
    return next(e);
  }
  const crc = validateWebhook(req.query.crc_token, auth, res);
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify(crc));
});

router.post('/twitter/webhook', function(req, res, next) {
  try {
    if (!validateSignature(req.headers, auth, req.rawBody)) {
      throw new Error('Cannot validate webhook signature');
    }
  } catch (e) {
    console.error(e);
    return next(e);
  }
  console.log('Event received:', JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

module.exports = router;
