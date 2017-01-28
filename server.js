// INITIALIZE DEPENDENCIES
var express = require('express');
var bodyParser = require("body-parser");
var apiRoutes = require('./app/routing/apiRoutes');
var htmlRoutes = require('./app/routing/htmlRoutes');

// INITIALIZE EXPRESS SERVER
var app = express();

// INITIALIZE A PORT NUMBER
var PORT = process.env.PORT || 3000;

// SETS UP THE EXPRESS APP TO HANDLE DATA PARSING
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

app.use(apiRoutes);
app.use(htmlRoutes);

// Set up automatic serving of static files
//app.use(express.static('app/public/'));

app.listen(PORT, function() {
    console.log("App listening on " + PORT);
});
