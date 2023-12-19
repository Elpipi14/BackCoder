export const validateLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

export const loginRoute = (req, res, next) => {
  if (req.user && req.user.isGithub) {
    res.redirect('/profile');
  } else {
    next();
  }
};

