var express = require('express');
var router = express.Router();

// Get User
router.get('/me', function(req, res, next) {
  if (req.user) {
    const user = JSON.parse(JSON.stringify(req.user));
    delete user.token;
    delete user.tokenSecret;
    res.json(user);
  } else {
    res.json({});
  }
});

module.exports = router;
