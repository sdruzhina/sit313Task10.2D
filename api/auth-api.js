const config = require('../config');
const express  = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
//const mail = require('../mail');

// Register a new user API route
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
                console.log('User created');
                res.status(200).send({ message: 'User created' });
        });
      }
    })(req, res, next);
  });

// Local strategy login
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
                    res.status(200).send({
                        auth: true,
                        token,
                        message: 'User logged in',
                    });
                });
            });
        }
    })(req, res, next);
});

// Signup page
router.get('/reqsignup', (req, res) => {
    // res.render('reqsignup.ejs', { err: [], data: null });
})

// Signup form
router.post('/reqsignup', (req, res) => {
    if (req.body.password !== req.body.passwordConfirm) {
        // res.render('reqsignup.ejs', { err: { errors: {passwordConfirm: 'Passwords must match.'}}, data: req.body })
    }
    User.register(new User({
        country: req.body.country,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
        mobile: req.body.mobile,
        createdAt: Date.now()
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            // res.render('reqsignup.ejs', { err: err, data: req.body });
        }
        else {
            passport.authenticate('local')(req, res, () => {
                // res.redirect('/reqtask');
            });
        }
    })
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    // res.redirect('/');
});

// Password reset form
router.get('/forgot', (req, res) => {
    // res.render('forgot-password', { sent: false });
});

// Password Reset POST request
router.post('/forgot', async function (req, res) {
    // Get the email and check if user exists
    const email = req.body.email.trim();
    let user;
    try {
        user = await User.findOne({ email }).exec()
    } 
    catch (err) {
        res.status(404).json('This email is not registered.')
    }

    // Create a JWT token using the constant secret
    const userId = user._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || config.keys.jwtSecret, {
        expiresIn: 1800 // 30 minutes
    });

    // Save the token to user's DB record
    user.updateOne({ resetToken: token }, (err, successs) => {
        if (err) {
            res.status(404).json('Error saving token.')
        }
    });

    // Password reset URL using user ID and token
    const url = `https://ancient-chamber-36974.herokuapp.com/auth/reset/${token}`;

    // Send the email
    //mail.sendPasswordReset(user.email, user.firstName, url);

    // Render the page with a confirmation message
    // res.render('forgot-password', { sent: true });
});

// Change Password form
router.get('/reset/:token', (req, res) => {
    // res.render('change-password', 
    //     { err: null, confirm: false, token: req.params.token });
});

// Change Password POST request
router.post('/reset/:token', async function (req, res) {
    if (!req.body.password || req.body.password !== req.body.passwordConfirm) {
        // res.render('change-password', 
        //     { err: {message: 'Passwords do not match.'}, 
        //     confirm: false, token: req.params.token });
    }
    // Decode the token
    let decoded;
    try {
        decoded = jwt.verify(req.params.token, process.env.JWT_SECRET || config.keys.jwtSecret);
    } 
    catch (err) {
        console.log(err);
        res.status(403).json('Token verification failed.');
    }
    // Find the user by ID stored in token
    let user;
    try {
        user = await User.findOne({ _id: decoded.userId }).exec();
    } 
    catch (err) {
        res.status(404).json('Invalid user.');
    }
    // Compare tokens
    if (user && user.resetToken === req.params.token) {
        // Set new password 
        await user.setPassword(req.body.password);
        await user.save();

        // Remove the token from user's DB record
        user.updateOne({ resetToken: '' }, (err, success) => {
            if (err) {
                res.status(404).json('Error resetting token.')
            }
        });

        // Confirm password change
        res.render('change-password', { err: null, confirm: true, token: '' });
    }
    else {
        res.status(404).json('User not found, or the token is invalid.')
    }
});

module.exports = router;