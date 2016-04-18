// get mongoose
var mongoose = require("mongoose");

// user data schema
var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}); 


// set export model 
module.exports = mongoose.model("Users", userSchema);

module.exports.getUsers  = function(callback, limit) {

this.find(callback).limit(limit);
    
};