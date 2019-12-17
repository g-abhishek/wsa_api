var mongoose  = require('mongoose');
var UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    password: {
        type: String
    },
    adhaarNumber: {
        type: Number
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;