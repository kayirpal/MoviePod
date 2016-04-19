var express = require('express');
var router = express.Router();

// users model
var users = require("../models/users");

// get users
router.get("/", function (req, res) {
    users.getUsers(function (err, userList) {
        if (err) {

        } else {
            res.json(userList);
        }
    });
});


// get single users
router.get("/:_id", function (req, res) {

    // get id
    var _id = req.params._id;

    // get current user
    users.getUser(_id, function (error, user) {

        if (error) {
            console.log("Some error occured");
        } else {
            res.json(user);
        }
    });
});

// add user
router.post("/", function (req, res) {

    var newUser = req.body;

    users.addUser(newUser, function (error, user) {

        if (error) {
            res.statusCode = 500;
            res.statusMessage = error.message;
            res.end();
        } else {
            res.json(user);
        }
    });
});


// update user
router.put("/:_id", function (req, res) {

    // get id
    var _id = req.params._id;

    // get new user details
    var curUser = req.body;

    // update user
    users.updateUser(_id, curUser, {}, function (error, user) {

        if (error) {
            console.log("Some error occured");
        } else {
            res.json(user);
        }
    });
});


// delete user
router.delete("/:_id", function (req, res) {

    // get id
    var _id = req.params._id;

    // update user
    users.deleteUser(_id, function (error, user) {

        if (error) {
            console.log("Some error occured");
        } else {
            res.json(user);
        }
    });
});

// authorize user
router.post("/authorize", function (req, res) {

    var userData = req.body;

    users.authorize(userData, function (error, user) {

        if (error) {
            res.statusCode = 500;
            res.statusMessage = error.message;
            res.end();
        } else {
            res.json(user);
        }
    });
});

// export user routes
module.exports = router;
