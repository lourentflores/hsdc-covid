const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const quizController = require("./quizController.js");
const passport = require("passport");
const session = require("express-session");
// const flash = require('connect-flash');
// const cookieParser = require('cookie-parser');
// const exphbs = require('express-handlebars');

const localStrategy = require("passport-local").Strategy;
const pool = require("./userModel");

app.use(express.json());
app.use(express.static("public"));

// statically serve everything in the build folder on the route '/build'
app.use("/build", express.static(path.join(__dirname, "../build")));

// route handlers:
//  login authentication
//  handle logout
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// route for sending quiz history to client
app.get("/profile", quizController.pullData, (req, res) => {
  res
    .status(200)
    .json(res.locals.quizHistory);
});  

//  test if user is authenticated
app.get("/", (req, res) => {
  res.send(req.isAuthenticated());
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
  res.status(500).send("Internal Server Error");
});

//listen
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = app;
