const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');

const Tweet = require('../models/Tweet');
const User = require('../models/User');

// Get User
router.get('/', isAuthenticated, async function(req, res, next) {
  const tweets = await Tweet.find({
    userId: req.user.twitterId,
    inReplyToStatusId: null,
  }).sort({ updatedAt: -1 });
  const tweetsWithUsers = tweets.map(async (tweet) => {
    tweet.from = await User.find({ twitterId: tweet.from });
  });
  res.json(tweetsWithUsers);
});

module.exports = router;
