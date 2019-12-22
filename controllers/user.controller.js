var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var sendmail = require('sendmail')();

exports.signUpUser = function (req, res) {
    if ( req.body.fullname && req.body.mobile && req.body.email && req.body.address && req.body.password && req.body.adhaarNumber) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                // Store hash in your password DB.
                password = hash;
                var userSchema = {
                    fullname: req.body.fullname,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    address: req.body.address,
                    password: password,
                    adhaarNumber: req.body.adhaarNumber
                }
                User.create(userSchema).then(user => {
                    var token = jwt.sign(JSON.stringify(user), 'WSA_SECRET_KEY');
                    return res.send({
                        message: 'user created',
                        responseCode: 200,
                        status: 200,
                        token: token,
                        user: user
                    })
                }).catch(err => {
                    return res.send({
                        message: 'err while creating user',
                        responseCode: 700,
                        status: 200,
                        error: err
                    })
                })
            });
        });
    } else {
        return res.send({
            message: 'all fields are required',
            responseCode: 100
        })
    }
}

exports.login = function (req, res) {
    if (req.body.email && req.body.password) {
        var userSchema = {
            email: req.body.email
        }
        User.findOne(userSchema).then(user => {
            if (user == null) {
                return res.send({
                    message: 'No user found',
                    responseCode: 500,
                    status: 200,
                    user: user
                })
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    // res === true
                    if (err) {
                        return res.send({
                            message: 'err while password matching',
                            responseCode: 800,
                            status: 200,
                            err: err
                        })
                    } else {
                        if (result === true) {
                            console.log('matched');
                            var token = jwt.sign(JSON.stringify(user), 'WSA_SECRET_KEY');
                            return res.send({
                                message: 'login successfull',
                                responseCode: 200,
                                status: 200,
                                token: token,
                                user: user
                            })
                        } else {
                            return res.send({
                                message: 'password did not matched',
                                responseCode: 300,
                                status: 200
                            })
                        }
                    }
                });
            }
        }).catch(err => {
            return res.send({
                message: 'err while finding email',
                responseCode: 700,
                status: 200,
                error: err
            })
        })
    } else {
        return res.send({
            message: 'all fields are required',
            responseCode: 100
        })
    }
}

exports.forgetPassword = function(req, res){
    if(req.body.email){
        console.log(req.body.email)
        var mailSchema = {
            from : 'ag528927@gmail.com',
            to : req.body.email,
            subject: 'your otp is 0987',
            html: 'Mail of test sendmail ',
        }

        sendmail({
            from: 'ag528927@gmail.com',
            to: 'ag528927@gmail.com',
            subject: 'test sendmail',
            html: 'Mail of test sendmail ',
          }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        });
        
        // sendmail({mailSchema}, function(err, result){
        //     if(err){
        //         return res.send({
        //             message: 'err while sending mail',
        //             responseCode: 700,
        //             status: 200,
        //             error: err
        //         })
        //     }else{
        //         return res.send({
        //             message: 'mail send',
        //             responseCode: 200,
        //             status: 200,
        //             result: result
        //         })
        //     }
        // })
    }else{
        return res.send({
            message: 'mail required',
            responseCode: 100,
            status: 200
        })
    }
}