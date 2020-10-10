const passport = require('passport');
const { Strategy: TwitterStrategy } = require('passport-twitter');
const { Autohook } = require('twitter-autohook');

const User = require('../models/User');
const { encrypt } = require('../utils/crypto');
const twit = require('../utils/twit');
// const webhook = require('../utils/webhook');

// Serialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
    },
    async function(token, tokenSecret, profile, done) {
      const {
        id_str,
        name,
        screen_name,
        location,
        profile_image_url_https,
      } = profile._json;

      // Get user
      let user;
      user = await User.findOne({ twitterId: id_str });

      // Check if user exists
      if (!user) {
        // Create new user
        user = await new User({
          twitterId: id_str,
          name,
          screenName: screen_name,
          location,
          profileImage: profile_image_url_https,
          isRegistered: true,
          token: encrypt(token),
          tokenSecret: encrypt(tokenSecret),
        }).save();
      }
      twit.setAuth({
        access_token: token,
        access_token_secret: tokenSecret,
      });
      twit.get('statuses/mentions_timeline', {}, function(err, data, response) {
        console.log(data);
      });

      try {
        const webhook = new Autohook({
          token,
          token_secret: tokenSecret,
        });

        // webhook.setAuth({ token, token_secret: tokenSecret });
        // Removes existing webhooks
        await webhook.removeWebhook(webhook);

        // Starts a server and adds a new webhook

        await webhook.start(process.env.TWITTER_WEBHOOK_URL);

        // Listens to incoming activity
        webhook.on('event', (event) => {
          console.log('Something happened:', event);
          if (event.tweet_create_events) {
          }
        });

        // Subscribes to your own user's activity
        await webhook.subscribe({
          oauth_token: token,
          oauth_token_secret: tokenSecret,
        });
      } catch (e) {
        // Display the error and quit
        console.error(e);
      }
      done(null, user);
    }
  )
);
