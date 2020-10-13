const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');
const twit = require('../utils/twit');
const { decrypt } = require('../utils/crypto');
const Tweet = require('../models/Tweet');
const User = require('../models/User');

router.get('/', isAuthenticated, async function(req, res, next) {
  const tweets = await Tweet.find({
    userId: req.user.twitterId,
    inReplyToStatusId: null,
  })
    .sort({ updatedAt: -1 })
    .lean();

  const tweetsWithUsers = tweets.map(async (tweet) => {
    const user = await User.findOne({ twitterId: tweet.from }).lean();

    return { ...tweet, from: user };
  });
  res.json(await Promise.all(tweetsWithUsers));
});

router.post('/', isAuthenticated, async function(req, res, next) {
  twit.setAuth({
    access_token: decrypt(req.user.token),
    access_token_secret: decrypt(req.user.tokenSecret),
  });
  twit.post(
    'statuses/update',
    {
      status: req.body.text,
      in_reply_to_status_id: req.body.to,
    },
    async function(err, tweet, response) {
      if (!err) {
        res.json(tweet);
      } else {
        console.error(err);
        res.json(err);
      }
    }
  );
});

router.get('/conversations/:id', isAuthenticated, async function(
  req,
  res,
  next
) {
  const tweetId = req.params.id;
  if (!tweetId) {
    return res.status(400).json({
      error: true,
      message: 'Enter valid id',
    });
  }
  const tweet = await Tweet.findOne({
    tweetId: req.params.id,
  }).lean();
  const user = await User.findOne({ twitterId: tweet.from }).lean();
  res.json(
    await traverseConversation(tweet.tweetId, tweet.from, [
      { ...tweet, from: user },
    ])
  );
});

const traverseConversation = async (tweetId, twitterId, conversation = []) => {
  const tweet = await Tweet.findOne({
    inReplyToStatusId: tweetId,
    inReplyToUserId: twitterId,
  }).lean();
  if (tweet) {
    const user = await User.findOne({ twitterId: tweet.from }).lean();
    conversation.push({ ...tweet, from: user });
    traverseConversation(tweet.tweetId, tweet.from, conversation);
  }
  return conversation;
};

module.exports = router;
