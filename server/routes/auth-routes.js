const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

//auth logout
router.get('/logout', (req, res) => {
  //handle with passport
  req.logout();
  res.redirect('/');
});

//auth with google
router.get(
  '/google',
  //authenticate is invoked with google strategy saved in passport setup and redirects to google consent screen
  passport.authenticate('google', {
    //what is retrieved from the user's profile if authentication is successful
    scope: ['profile'],
  })
);

//callback route for google to redirect to after succesful authentication
//authenticate middleware grabs code from redirect URI and exchanges code for profile info and fires passport cb function
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  //we can access currently logged in user through req.user
  res.redirect('/profile/');
});

module.exports = router;
