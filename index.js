const port = 8394;
const express = require('express');
const route = require('./routes');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const app = express();

// use post request  url
app.use(express.urlencoded());

//for json req/res
app.use(express.json());

// use static file 
app.use(express.static('./assets'));

// Set Up the view Engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use express layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use cookie-parser
app.use(cookieParser());

//use session
app.use(session({
    name: 'placementCell',
    // TODO change the secret before deployment in production mode
    secret: 'blahSomething',
    saveUninitialized: false,

    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'disabled'

        },
        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

// use passport...
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



//use routes
app.use(route);

app.listen(port, function(error) {

    if (error) {
        console.log(`Error in running the server:${error}`);
    }
    console.log(`Server is running on port: ${port}`);
});