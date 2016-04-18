// get express
var express = require("express");

// create express app
var app = express();

// users model
var users = require("./models/users");

// DB connection

// monogose 
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/moviePod");

var dbConnection = mongoose.connection;

// listen to web requests

// root 
app.get("/", function(req, res) {    
    res.send("Welcome to my world!");    
});

// get users
app.get("/api/getUsers", function (req, res) {
    users.getUsers(function (err, userList) {
        if(err){
            
        }else{
            res.send(userList);
        }
    });
});

// host server to port
app.listen(8888);

