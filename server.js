const express = require('express');
const bodyParser = require('body-parser');
const Requester = require('./models/User');
const mongoose = require('mongoose');
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

// Routes and API
const requesterApi = require('./api/requester-api');
//const workerApi = require('./api/worker-api');
const authRoutes = require('./routes/auth-routes');
const config = require('./config');

const app = express()

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || config.mongoDB.uri, 
    {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
app.use(requesterApi);
//app.use(workerApi);
app.use('/auth', authRoutes);

// Session and Passport
app.use(session({
    secret : 'Deakin2020',
    resave: false,
    saveUninitialized: false, 
    cookie: { maxAge: 480000 },
    store: new MongoStore({ 
        mongooseConnection: mongoose.connection, 
        ttl: 2 * 60 * 60 // 2 hours
    })
}));

app.use(passport.initialize());
app.use(passport.session());

// Initialise Passport strategies for requesters
passport.use(Requester.createStrategy())
passport.serializeUser(Requester.serializeUser())
passport.deserializeUser(Requester.deserializeUser())


/**
 * Routes
 */

// Entry point 
app.get('/', (req, res) => {
    res.json('Home');
    // Check if the user is set in the session
    // if (!req.isAuthenticated()) {
    //     // redirect it to login page
    //     // res.redirect('/auth/login');
    // } 
    // else {
    //     // res.redirect('/reqtask');
    // }
})

let port = process.env.PORT;
if (port == null || port == '') {
  port = 8080;
}

app.listen(port, (req, res)=>{
    console.log('Server is running successfully!');
})