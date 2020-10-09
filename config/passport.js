const config = require('../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require("../models/User");


// Local strategy for new user signup
passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, email, password, done) => {
            console.log(email);
        try {
            // Check if the email already exists in DB
            User.findOne({ email })
            .then(user => {
                if (user != null) {
                    console.log('This email is already taken');
                    return done(null, false, {
                        message: 'This email is already taken',
                    });
                }

                // Register a new user woth Passport 
                User.register(new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    isRequester: req.body.isRequester,
                    isWorker: req.body.isWorker,
                    createdAt: Date.now()
                }), req.body.password, (err, user) => {
                    if (err) {
                        console.log(err);
                        return done(err, user);                
                    }
                    else {
                        console.log('User created');
                        return done(null, user);
                    }
                })
            });
        } 
        catch (err) {
            return done(err);
        }
    },
  ),
);

// Local strategy for user login
// passport.use(
//     'login',
//     new LocalStrategy(
//     {
//         usernameField: 'email',
//         passwordField: 'password',
//         session: false,
//     },
//     (email, password, done) => {
//         try {
//             User.findOne({ email })
//             .then(user => {
//             if (user === null) {
//                 return done(null, false, { message: 'User not found' });
//             }
//             bcrypt.compare(password, user.password).then(response => {
//             if (response !== true) {
//                 console.log('passwords do not match');
//                 return done(null, false, { message: 'passwords do not match' });
//             }
//             console.log('user found & authenticated');
//             return done(null, user);
//             });
//         });
//         } catch (err) {
//         done(err);
//         }
//     },
//     ),
//     );

// const opts = {
//   jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
//   secretOrKey: config.keys.jwtSecret,
// };

// passport.use(
//   'jwt',
//   new JWTstrategy(opts, (jwt_payload, done) => {
//     try {
//       User.findOne({
//         where: {
//           id: jwt_payload.id,
//         },
//       }).then(user => {
//         if (user) {
//           console.log('user found in db in passport');
//           done(null, user);
//         } else {
//           console.log('user not found in db');
//           done(null, false);
//         }
//       });
//     } catch (err) {
//       done(err);
//     }
//   }),
// );