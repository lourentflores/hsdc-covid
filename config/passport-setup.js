const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../server/models/mongoModel');

//create unique cookie from mongodb id from user
passport.serializeUser((user, done) => {
  done(null, user.id); //creates a cookie for the browser from the user id
});

//when user comes back to app, retrieves user by matched id from cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
    //attaches user property to request
  });
});

passport.use(
  new GoogleStrategy(
    {
      //use google api to authenticate users from credentials belows
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      //accessToken given by google after permission is granted //refreshToken refreshes accessToken after it expires
      //profile - user information retrived in exchange of redirect query code, returned as obj with id, display name, photo

      //check to see if we have a match in db with profile id being sent from oauth
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        //retrieve current user from db if it exist
        if (currentUser) {
          // console.log('user exist', currentUser);
          done(null, currentUser); //goes to serialize user if there is no error
        } else {
          //create user in db
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              // console.log('newUser', newUser);
              done(null, newUser); //goes to serialize user
            });
        }
      });
    }
  )
);

// passport.use(
//   'local',
//   new localStrategy(
//     { passReqToCallback: true, usernameField: 'username' },

//     (req, username, password, done) => {
//       console.log('called local strategy');
//       pool.connect((err, client) => {
//         let user = {};
//         const query = client.query(
//           'SELECT * FROM userstore WHERE username = $1',
//           [username]
//         );

//         query.on('row', (row) => {
//           console.log('User obj', row);
//           console.log('Password', password);
//           user = row;
//           if (password === user.password) {
//             console.log('match');
//             done(null, user);
//           } else {
//             done(null, false, { message: 'Incorrect username and password' });
//           }
//         });
//         query.on('end', () => client.end());
//         if (err) console.log(err);
//       });
//     }
//   )
// );

// app.post('/', (req, res) => {
//   pool.connect((err, client) => {
//     const query = client.query(
//       'INSERT INTO userstore (username, password) VALUES ($1, $2)',
//       [req.body.username, req.body.password]
//     );

//     query.on('error', (err) => console.log(err));
//     query.on('end', () => {
//       res.sendStatus(200);
//       client.end();
//     });
//   });
// });

// app.post(
//   '/',
//   passport.authenticate('local', {
//     successRedirect: '/home',
//     failureRedirect: '/',
//   })
// );
