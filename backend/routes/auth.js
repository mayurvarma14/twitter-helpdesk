const express = require('express');
const passport = require('passport');
const { validateWebhook, validateSignature } = require('twitter-autohook');
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

    const auth = {
      token: process.env.TWITTER_ACCESS_TOKEN,
      token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      env: TWITTER_WEBHOOK_ENV,
    };
    try {
      if (
        !validateSignature(
          req.headers,
          auth,
          require('url').parse(req.url).query
        )
      ) {
        console.error('Cannot validate webhook signature');
        throw new Error('Cannot validate webhook signature');
      }
    } catch (e) {
      console.error(e);
      next(e);
    }

    const crc = validateWebhook(req.query.crc_token, auth, res);
    res.json(JSON.stringify(crc));
  }
});

module.exports = router;
