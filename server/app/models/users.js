// get mongoose
var mongoose = require("mongoose");

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
    model.find(where, callback);
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