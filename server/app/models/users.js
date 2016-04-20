// get mongoose
var mongoose = require("mongoose");

// user movie schema
var userMovieSchema = mongoose.Schema({

    // movie id
    imdbID: { type: String, required: true },

    // is watched flag
    isWatched: { type: Boolean, default: false },

    // user rating of the movie
    rating: { type: Number, min: 0, max: 10 },

    // modified date
    timestamp: { type: Date, default: Date.now }
});

// user data schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    movies: [userMovieSchema],

    timestamp: {
        type: Date,
        require: true
    }
});


// set export model 
var model = module.exports = mongoose.model("Users", userSchema);

// get all users
model.getUsers = function (callback, limit) {

    this.find(callback).limit(limit);
};


// get current user
model.getUser = function (_id, callback) {

    // where clause, match by id
    var where = { _id: _id };

    // find current user
    model.findOne(where, callback);
};

// add user
model.addUser = function (newUser, callback) {
    model.create(newUser, callback);
};

// put
model.updateUser = function (_id, curUser, options, callback) {

    // where clause, match by id
    var where = { _id: _id };

    // set clause
    var update = {
        name: curUser.name
    };

    // update DB
    model.findOneAndUpdate(where, update, options, callback);
};

// delete
model.deleteUser = function (_id, callback) {

    // where clause, match by id
    var whereClause = { _id: _id };

    model.remove(whereClause, callback);
};


// authorize
model.authorize = function (userData, callback) {

    // where clause, match by email and password
    var whereClause = { email: userData.email, password: userData.password };

    // get user
    model.findOne(whereClause, callback);
};

// get all user movies
model.getUserMovies = function (_id, callback, imbdId) {

    // where clause, match by id
    var where = { _id: _id };

    // find current user
    model.findOne(where, function (error, user) {

        // get movies
        var movies = user ? user.movies : undefined;

        // return the result
        callback(error, movies);

    });
};

// get specific user movie
model.getUserMovie = function (_id, imbdId, callback) {

    // where clause, match by id
    var where = { _id: _id, 'movies.imdbID': imbdId };

    // find current user
    model.findOne(where, function (error, user) {

        // get movies
        var movies = user && user.movies ? user.movies[0] : undefined;

        // return the result
        callback(error, movies);

    });
};

// add movie to user movie list
model.addUserMovie = function (_id, userMovie, callback) {

    // where clause, match by id find user
    var where = { _id: _id };

    model.update(where, {
        $push: {
            "movies": userMovie
        }
    }, { upsert: true }, callback);

};


// add movie to user movie list
model.updateMovie = function (_id, imdbID, userMovie, callback) {

    // where clause, match by id find user
    var where = { _id: _id, 'movies.imdbID': imdbID };

    model.update(where, {
        $set: {
            "movies.$.isWatched": userMovie.isWatched,
            "movies.$.rating": userMovie.rating
        }
    }, callback);

};