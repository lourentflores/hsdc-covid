const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const quizController = require("./quizController.js");
const quizController = require("./quizController.js");
const passport = require("passport");
const session = require("express-session");
// const flash = require('connect-flash');
// const cookieParser = require('cookie-parser');
// const exphbs = require('express-handlebars');

const localStrategy = require("passport-local").Strategy;
const pool = require("/userModel");

app.use(express.json());
app.use(express.static("public"));
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

//allows user to be remembered between requests
app.use(
  session({
    key: "user_id",
    secret: "lock",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000, secure: false }, //set to true if we set HTTPS
  })
);

passport.use(
  "local",
  new localStrategy(
    { passReqToCallback: true, usernameField: "username" },

    (req, username, password, done) => {
      console.log("called local strategy");
      pool.connect((err, client) => {
        let user = {};
        const query = client.query(
          "SELECT * FROM userstore WHERE username = $1",
          [username]
        );

        query.on("row", (row) => {
          console.log("User obj", row);
          console.log("Password", password);
          user = row;
          if (password === user.password) {
            console.log("match");
            done(null, user);
          } else {
            done(null, false, { message: "Incorrect username and password" });
          }
        });
        query.on("end", () => client.end());
        if (err) console.log(err);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  pool.connect((err, client) => {
    console.log("called deserializedUser");

    let user = {};
    const query = client.query("SELECT * FROM userstore WHERE id = $1", [id]);

    query.on("row", (row) => {
      console.log("User row", row);
      user = row;
      done(null, user);
    });
    //After all data is returned, close connection and return results
    query.on("end", () => client.end());

    if (err) console.log(err);
  });
});
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// statically serve everything in the build folder on the route '/build'
app.use("/build", express.static(path.join(__dirname, "../build")));

// route handler to send risk assessment results back to client
app.get("*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

// route handlers:
//  login authentication
//  handle logout
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
);

// signup authentication
// app.get('/register', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, '../signup.js'));
// });
app.post("/", (req, res) => {
  pool.connect((err, client) => {
    const query = client.query(
      "INSERT INTO userstore (username, password) VALUES ($1, $2)",
      [req.body.username, req.body.password]
    );

    query.on("error", (err) => console.log(err));
    query.on("end", () => {
      res.sendStatus(200);
      client.end();
    });
  });
});

//  test if user is authenticated
app.get("/", (req, res) => {
  res.send(req.isAuthenticated());
});

//  will receive the Submit event from the frontend when user completes the quiz
//  and send assessment result back to frontend:
app.post("/", quizController.calculateRisk, (req, res) => {
  res
    .status(200)
    // .redirect('/results');
    .send(res.locals);
});

// ideally would check login credentials here, but skipping until DB and Auth is completed
app.post("/login", (req, res) => {
  console.log(req.body);
  res.status(200).json("Login Successful");
});

// serve index.html on all the pages
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });

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
