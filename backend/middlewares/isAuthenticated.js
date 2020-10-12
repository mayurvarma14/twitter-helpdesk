const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: 'User not authorized',
    });
  } else {
    next();
  }
};

module.exports = isAuthenticated;
