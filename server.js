// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/**
 * GET /api/timestamp/:date_string?
 */
app.get("/api/timestamp/:date_string?", function (req, res) {
    // Date param
    let dateString  = req.params.date_string;
    // If the date_string is undefined, return the current date
    if(!dateString) {
        res.json({
            unix    : (new Date()).getTime(),
            utc     : (new Date()).toUTCString()
        });
        return;
    }
    // convert the dateString to an integer if it a number
    if(!isNaN(dateString)) {
        dateString = parseInt(dateString, 10);
    }
    // construct datetime
    const dateObj = new Date(dateString);
    if(dateObj.toString() !== "Invalid Date") {
        res.json({
            unix    : dateObj.getTime(),
            utc     : dateObj.toUTCString()
        });
    } else {
        res.json({
            error   : "Invalid Date"
        });
    }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});