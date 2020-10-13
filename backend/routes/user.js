var express = require('express');
var router = express.Router();

const isAuthenticated = require('../middlewares/isAuthenticated');
// Get User
router.get('/me', isAuthenticated, function(req, res, next) {
  if (req.user) {
    const user = JSON.parse(JSON.stringify(req.user));
    delete user.token;
    delete user.tokenSecret;
    res.json(user);
  }
});

module.exports = router;
