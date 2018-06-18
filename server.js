// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;

var morgan       = require('morgan');
let path         = require('path');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var userRoutes   = require('./app/routes/user');

app.use(express.static(path.join(__dirname, 'public')));
// app.use( express.static( "public" ) );


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));

// routes ======================================================================
app.use('/', userRoutes);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
