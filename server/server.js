const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const quizController = require('./quizController.js');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profileRoutes');
const keys = require('../config/keys');
const cookieSession = require('cookie-session');

//allows for google strategy to be called by passport and grant permission from google to redirect if successful
const passportSetup = require('../config/passport-setup');

app.use(express.json());

//  set up view engine to see on browser
app.set('view engine', 'ejs');

//  cookie encryption set for a day
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

//  initialize passport & sessions for login request
app.use(passport.initialize());
app.use(passport.session());

// set up routes associated with authentication
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route to view engine in backend
app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// route handler to send risk assessment results back to client
app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

//  will receive the Submit event from the frontend when user completes the quiz
//  and send assessment result back to frontend:
app.post("/", quizController.calculateRisk, quizController.addToDb, (req, res) => {
  res
    .status(200)
    .send(res.locals);
});

// ideally would check login credentials here, but skipping until DB and Auth is completed
app.post("/login", (req, res) => {
  console.log(req.body);
  res.status(200).json("Login Successful");
});

// route handler to send users back to homescreen if typed bad url
app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

//listen
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = app;
