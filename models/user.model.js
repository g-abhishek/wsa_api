var mongoose  = require('mongoose');
var UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
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

var User = mongoose.model('User', UserSchema);
module.exports = User;