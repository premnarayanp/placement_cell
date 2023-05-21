const port = 8394;
const express = require('express');
const route = require('./routes');
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


//use routes
app.use(route);

app.listen(port, function(error) {

    if (error) {
        console.log(`Error in running the server:${error}`);
    }
    console.log(`Server is running on port: ${port}`);
});