const port = 8394;
const express = require('express');
const route = require('./routes')

// create App
const app = express();

// use post request  url
app.use(express.urlencoded());

// use static file 
app.use(express.static('./assets'));

// Set Up the view Engine
app.set('view engine', 'ejs');
app.set('views', './views');

//for json req/res
app.use(express.json());

//use routes
app.use(route);

app.listen(port, function(error) {

    if (error) {
        console.log(`Error in running the server:${error}`);
    }
    console.log(`Server is running on port: ${port}`);
});