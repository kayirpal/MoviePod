
// get express
var express = require("express");

// CORS
var cors = require("cors");

// create express app
var app = express();

// enable cors
app.use(cors());

// instentiate body parser
var bodyParser = require('body-parser');

// config parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB connection

// monogose 
var mongoose = require("mongoose");

var db_name = "moviePod";

//provide a sensible default for local development
var mongodb_connection_string = 'mongodb://ec2-54-172-66-161.compute-1.amazonaws.com:27017/' + db_name;

mongoose.connect(mongodb_connection_string);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
                
                db.once('open', function callback() {
                    console.log('db connection open');
                });

// router
var router = express.Router();

// user routes
var users = require('./routes/users');

// root 
router.get("/", function (req, res) {
    res.send("Welcome. Use 'api' end point");
});

// show service end points
router.get("/api", function (req, res) {
    res.send("use '/api/users' for user api");
});

// route mappings
app.use('/api/users', users);
app.use('/', router);

// host server to port
app.listen(8888);

console.log("Listening on port 8888");
