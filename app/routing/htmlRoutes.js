// INITIALIZE DEPENDENCIES
var express = require('express');
var path = require("path");

var htmlRoutes = express.Router();

htmlRoutes.get('/survey', function(req, res) {
    console.log("app.get('/survey', function(req, res) {");
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

// htmlRoutes
htmlRoutes.use(function(req, res) {
    console.log("app.use(function(req, res) {");
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

module.exports = htmlRoutes;