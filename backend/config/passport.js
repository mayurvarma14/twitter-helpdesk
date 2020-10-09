const passport = require('passport');
const { Strategy: TwitterStrategy } = require('passport-twitter');

const User = require('../models/User');
const { encrypt } = require('../utils/crypto');

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
          token: encrypt(token),
          tokenSecret: encrypt(tokenSecret),
        }).save();
      }
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
      done(null, user);
    }
  )
);
