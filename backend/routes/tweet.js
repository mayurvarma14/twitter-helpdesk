const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');

const Tweet = require('../models/Tweet');

// Get User
router.get('/', isAuthenticated, async function(req, res, next) {
  const tweets = await Tweet.find({
    userId: req.user.twitterId,
    inReplyToStatusId: null,
  }).sort({ updatedAt: -1 });
  res.json(tweets);
});

module.exports = router;
