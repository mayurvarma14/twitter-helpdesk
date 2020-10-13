const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    twitterId: { type: String, unique: true },
    name: String,
    screenName: String,
    location: String,
    profileImage: String,
    token: {
      iv: String,
      content: String,
      select: false,
    },
    tokenSecret: {
      iv: String,
      content: String,
      select: false,
    },
    isRegistered: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
