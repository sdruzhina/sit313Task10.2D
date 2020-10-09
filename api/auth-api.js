const config = require('../config');
const express  = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//const mail = require('../mail');

// Register a new user API route with a custom local strategy
router.post('/register', (req, res, next) => {
    if (req.body.password !== req.body.passwordConfirm) {
        res.status(401).send({ message: 'Password and password confirmation must match' });
    }
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.error(err);
        }
        if (info !== undefined) {
            console.error(info.message);
            res.status(403).send(info.message);
        } 
        else {
            req.logIn(user, error => {
                console.log(user);
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || config.keys.jwtSecret, {
                    expiresIn: 60 * 60,
                });
                const userData = {
                    name: user.firstName,
                    isRequester: user.isRequester,
                    isWorker: user.isWorker
                };
                res.status(200).send({
                    auth: true,
                    token,
                    user: userData,
                    message: 'User created and logged in',
                });
        });
      }
    })(req, res, next);
  });

// Login with local strategy
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, users, info) => {
        if (err) {
            console.error(`error ${err}`);
        }
        if (info !== undefined) {
            console.error(info.message);
            res.status(403).send(info.message);
        } 
        else {
            req.logIn(users, () => {
                User.findOne({ email: req.body.email })
                .then(user => {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || config.keys.jwtSecret, {
                        expiresIn: 60 * 60,
                    });
                    const userData = {
                        name: user.firstName,
                        isRequester: user.isRequester,
                        isWorker: user.isWorker
                    };
                    res.status(200).send({
                        auth: true,
                        token,
                        user: userData,
                        message: 'User logged in',
                    });
                });
            });
        }
    })(req, res, next);
});

// TEST API secure endpoint
router.get('/user', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.status(401).send(info.message);
        } 
        else if (user.email === req.query.email) {
            User.findOne({ email: req.query.email })
            .then((userInfo) => {
            if (userInfo != null) {
                console.log('User found in db');
                res.status(200).send({
                    auth: true,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    message: 'User found in db',
                });
            } 
            else {
                console.error('No user exists in db with that email');
                res.status(401).send('No user exists in db with that email');
            }
            });
        } else {
            console.error('JWT id and email do not match');
            res.status(403).send('JWT id and email do not match');
        }
        })(req, res, next);
  });

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    // res.redirect('/');
});


module.exports = router;