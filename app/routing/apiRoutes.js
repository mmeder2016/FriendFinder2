var express = require('express');
var path = require("path");
var fs = require('fs');
var friends = require('../data/friends');

var apiRoutes = express.Router();

var FRIENDSFILE = "friends.json";
var DEBUG = false;
//     For the POST and GET API call in this file, I use a JSON file to hold
// the friends array during development. This makes it convenient for 
// debugging. 

// API GET Request /friends
// Creates response containing the friends array as JSON data
apiRoutes.get('/api/friends', function(req, res) {
    console.log("apiRoutes.get(\'/api/friends\', function(req, res) {");

    if (DEBUG) {
        try {
            var data = fs.readFileSync(FRIENDSFILE);
            friends = JSON.parse(data);
        } catch (err) {
            // if the file is not found, use the array contents
            console.log("Error reading file \"" + FRIENDSFILE + "\", using static array.");
        }
    }
    res.json(friends);
});

apiRoutes.post('/api/friends', function(req, res) {
    console.log("apiRoutes.post(\'/api/friends\', function(req, res) {");
    // 1.) Get the new person as a JSON object
    var new_person = req.body;

    // minval keeps track of the smallest calculated difference in the loop.
    // min idx keeps track of the index into both the difference array and
    // the friends array of this value
    var best_match_val = Number.MAX_SAFE_INTEGER;
    var best_match_idx = 0;
    // 2.) Calculate the difference value between new_person and each person
    //     in the friends array. Store this value in the array "difference"
    //     with the same index corresponding to the friends array 
    var difference = [];    
    for (var i = 0; i < friends.length; i++) {
        // accumulate the difference total in acc
        var acc = 0;
        for (var j = 0; j < friends[i].scores.length; j++) {
            // get the difference at each index
            n = Math.abs(new_person.scores[j] - friends[i].scores[j]);
            acc += n;
        }
        difference[i] = acc;
        if(acc < best_match_val) {
            best_match_val = acc;
            best_match_idx = i;
        }
    }
    // Add the new person to the array
    friends.push(new_person);    
    console.log("difference array = " + difference);
    console.log(friends);

    if (DEBUG) {
        try {
            fs.writeFileSync(FRIENDSFILE, JSON.stringify(friends));
        } catch (err) {
            // if file error, log message and give up
            console.log(err);
            console.log("Error writing file \"" + FRIENDSFILE + "\".");
        }
    }
    // use the index of the first value of best_match_ to chose friend
    res.json(friends[best_match_idx]);
});

module.exports = apiRoutes;