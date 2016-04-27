var express = require('express');
var router = express.Router();

// users model
var users = require("../models/users");

// get users
router.get("/", function (req, res) {
                    console.log('get users');
    users.getUsers(function (err, userList) {
        if (err) {

                    console.log(err);
            res.status(500);
            res.render('error', { error: err });

        } else {
            res.json(userList);
        }
    });
});


// get single users
router.get("/:_id", function (req, res) {

    // get id
    var _id = req.params._id;
                    console.log('get user' +_id );

    // get current user
    users.getUser(_id, function (error, user) {

        if (error) {

            res.status(500);
            res.render('error', { error: error });
        } else {
            res.json(user);
        }
    });
});

// add user
router.post("/", function (req, res) {
                    console.log('insert users');

    var newUser = req.body;

    users.addUser(newUser, function (error, user) {

        if (error) {

            res.status(500);
            res.render('error', { error: error });
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
                    console.log('set user'+ _id);

    // update user
    users.updateUser(_id, curUser, {}, function (error, user) {

        if (error) {

            res.status(500);
            res.render('error', { error: error });
        } else {
            res.json(user);
        }
    });
});


// delete user
router.delete("/:_id", function (req, res) {

    // get id
    var _id = req.params._id;

                    console.log('delete user'+ _id);
    // update user
    users.deleteUser(_id, function (error, user) {

        if (error) {

            res.status(500);
            res.render('error', { error: error });
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

            res.status(500);
            res.render('error', { error: error });
        } else {
            res.json(user);
        }
    });
});


// get all user movies
router.get("/:_id/movies", function (req, res) {

    // get user id
    var _id = req.params._id;

    users.getUserMovies(_id, function (error, movies) {

        if (error) {

            res.status(500);
            res.render('error', { error: error });
        } else {
            res.json(movies);
        }
    });

});

// get single user movie
router.get("/:_id/movies/:imdbID", function (req, res) {

    // get id
    var _id = req.params._id;

    // get IMDB id
    var imdbID = req.params.imdbID;

    // get current user
    users.getUserMovie(_id, imdbID, function (error, movie) {

        if (error) {

            res.status(500);
            res.render('error', { error: error });
        } else {
            res.json(movie);
        }
    });

});

// add user movie        
router.post("/:_id/movies", function (req, res) {

    // get id
    var _id = req.params._id;

    // get new user details
    var curMovie = req.body;

    // update user
    users.addUserMovie(_id, curMovie, function (error, movie) {

        if (error) {

            res.status(500);
            res.render('error', { error: error });
        } else {
            res.json(movie);
        }
    });
});

// update user movie        
router.put("/:_id/movies/:imdbID", function (req, res) {

    // get id
    var _id = req.params._id;

    // get IMDB id
    var imdbID = req.params.imdbID;

    // get new user details
    var curMovie = req.body;

    // update user
    users.updateMovie(_id, imdbID, curMovie, function (error, movie) {

        if (error) {

            res.status(500);
            res.render('error', { error: error });
        } else {
            res.json(movie);
        }
    });
});

// delete user
router.delete("/:_id/movies/:imdbID", function (req, res) {

    // get id
    var _id = req.params._id;

    // update user
    users.deleteMovie(_id, function (error, movie) {

        if (error) {

            res.status(500);
            res.render('error', { error: error });
        } else {
            res.json(movie);
        }
    });
});


// export user routes
module.exports = router;
