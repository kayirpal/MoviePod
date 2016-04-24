// server details
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

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
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;

//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string);

var db = mongoose.connection;

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
app.listen(server_port || 8888);

