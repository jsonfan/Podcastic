// Require the Express Module
var express = require("express"),
    path = require("path"),
    mongoose = require('mongoose'),
    app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000
// middleware configuration
app.use(bodyParser.json());
require('./server/config/mongoose.js');
//routes
require('./server/config/routes.js')(app);

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));

var server = app.listen(port, function() {
 console.log("listening on port %d", port);
});
