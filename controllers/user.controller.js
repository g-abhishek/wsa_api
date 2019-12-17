var User = require('../models/user.model');
var jwt = require('jsonwebtoken');

exports.signUpUser = function(req, res){
    if(req.body.fullname && req.body.mobile && req.body.email && req.body.address && req.body.password && req.body.adhaarNumber){
        var userSchema = {
            fullname: req.body.fullname,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password,
            adhaarNumber: req.body.adhaarNumber
        }
        User.create(userSchema).then(user =>{
            var token = jwt.sign(JSON.stringify(user), 'WSA_SECRET_KEY');
            return res.send({
                message: 'user created',
                responseCode: 200,
                status: 200,
                token: token,
                user: user
            })
        }).catch(err =>{
             return res.send({
                 message: 'err while creating user',
                 responseCode: 700,
                 status: 200,
                 error: err
             })
        })
    }else{
        return res.send({
            message: 'all fields are required',
            responseCode: 100
        })
    }
}