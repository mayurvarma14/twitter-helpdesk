const passport = require('passport');
const { Strategy: TwitterStrategy } = require('passport-twitter');

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
    },
    function(token, tokenSecret, profile, done) {
      // console.log(
      //   'Log: token, tokenSecret, profile',
      //   token,
      //   tokenSecret,
      //   profile
      // );
      // var Twit = require('twit');

      // var T = new Twit({
      //   consumer_key: process.env.TWITTER_CONSUMER_KEY,
      //   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      //   access_token: token,
      //   access_token_secret: tokenSecret,
      // });

      //
      //  tweet 'hello world!'
      //
      // T.post('statuses/update', { status: 'hello world!' }, function(
      //   err,
      //   data,
      //   response
      // ) {
      //   console.log(data);
      // });
      done(null, {});
    }
  )
);
