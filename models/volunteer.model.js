var mongoose  = require('mongoose');
var VolSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true   
    },
    address: {
        type: String
    },
    password: {
        type: String
    },
    adhaarNumber: {
        type: Number,
        unique: true
    }
});

var Volunteer = mongoose.model('Volunteer', VolSchema);
module.exports = Volunteer;