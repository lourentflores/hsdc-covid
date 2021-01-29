const router = require('express').Router();

//check if user is logged in => if not send to login page
const authCheck = (req, res, next) => {
  //if user is not logged in redirect
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  //send user's data back to profile with req.user
  res.render('profile', { user: req.user });
});

module.exports = router;
