const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    userId: String,
    tweetId: String,
    text: String,
    timestamp: Date,
    inReplyToStatusId: String,
    inReplyToUserId: String,
  },
  { timestamps: true }
);

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
