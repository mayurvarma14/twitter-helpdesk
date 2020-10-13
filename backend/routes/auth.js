module.exports = ({ Router, io }) => {
  const passport = require('passport');
  const { validateWebhook, validateSignature } = require('twitter-autohook');
  const url = require('url');

  const Tweet = require('../models/Tweet');
  const User = require('../models/User');

  const router = Router();

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
      successRedirect: `${process.env.APP_URL}/conversations`,
      failureRedirect: `${process.env.APP_URL}/login`,
    })
  );

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.APP_URL);
  });

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
    filterTweets(req.body, (data) => {
      req.app.io.emit('tweet', data);
    });
    req.app.io.emit('tweet', req.body);
    console.log('Event received:', JSON.stringify(req.body, null, 2));
    res.status(200).end();
  });
  const isMentionedTweet = (event) =>
    event &&
    event.tweet_create_events &&
    event.tweet_create_events.length &&
    event.tweet_create_events[0].entities.user_mentions.length;

  const filterTweets = async (event, callback) => {
    if (!event) return;
    if (isMentionedTweet(event)) {
      const tweet = event.tweet_create_events[0];

      try {
        const newTweet = await new Tweet({
          userId: event.for_user_id,
          tweetId: tweet.id_str,
          from: tweet.user.id_str,
          text: tweet.text,
          timestamp: new Date(tweet.timestamp_ms * 1000),
          inReplyToStatusId: tweet.in_reply_to_status_id_str,
          inReplyToUserId: tweet.in_reply_to_user_id_str,
        }).save();
        let user = await User.findOne({ twitterId: tweet.user.id_str });
        if (!user) {
          user = await new User({
            twitterId: tweet.user.id_str,
            name: tweet.user.name,
            screenName: tweet.user.screen_name,
            location: tweet.user.location,
            profileImage: tweet.user.profile_image_url_https,
          }).save();
        }
        newTweet.from = user;
      } catch (error) {
        console.log('Error saving tweet', error);
      }
    }
  };
  return router;
};
