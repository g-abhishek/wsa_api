var Volunteer = require('../models/volunteer.model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.adminLogin = function (req, res) {
    if (req.body.username === "admin" && req.body.password === "admin") {
        var userSchema = {
            username: req.body.username,
            password: req.body.password
        }
        var token = jwt.sign(JSON.stringify(userSchema), 'WSA_SECRET_KEY');
        return res.send({
            message: 'admin login successfull',
            responseCode: 200,
            status: 200,
            token: token,
            admin: userSchema
        })
    } else {
        return res.send({
            message: 'all fields are required',
            responseCode: 100
        })
    }
}

exports.addVolunteer = function (req, res) {
    var token = req.headers.token;
    if (token) {
        jwt.verify(token, 'WSA_SECRET_KEY', (err, user) => {
            if (err) {
                return res.send({
                    message: 'not valid token',
                    responseCode: 700,
                    status: 200,
                    error: err
                })
            } else {
                if (req.body.fullname && req.body.username && req.body.mobile && req.body.email && req.body.address && req.body.password && req.body.adhaarNumber) {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            // Store hash in your password DB.
                            var volSchema = {
                                fullname: req.body.fullname,
                                username: req.body.username,
                                mobile: req.body.mobile,
                                email: req.body.email,
                                address: req.body.address,
                                password: hash,
                                adhaarNumber: req.body.adhaarNumber
                            }
                            Volunteer.create(volSchema).then(volunteer => {
                                var token = jwt.sign(JSON.stringify(volunteer), 'WSA_SECRET_KEY');
                                return res.send({
                                    message: 'volunteer created',
                                    responseCode: 200,
                                    status: 200,
                                    token: token,
                                    volunteer: volunteer
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
        })
    } else {
        return res.send({
            message: 'token required',
            responseCode: 600
        })
    }

}

exports.showAllVolunteer = function (req, res) {
    var token = req.headers.token;
    if (token) {
        jwt.verify(token, 'WSA_SECRET_KEY', (err, user) => {
            if (err) {
                return res.send({
                    message: 'not valid token',
                    responseCode: 700,
                    status: 200,
                    error: err
                })
            } else {
                Volunteer.find({}).then(volunteers => {
                    if (volunteers == null) {
                        return res.send({
                            message: 'No user found',
                            responseCode: 500,
                            status: 200,
                            volunteers: volunteers
                        })
                    } else {
                        return res.send({
                            message: 'List of Volunteers',
                            responseCode: 200,
                            status: 200,
                            volunteers: volunteers
                        })
                    }
                }).catch(err => {
                    return res.send({
                        message: 'err while finding volunteer',
                        responseCode: 700,
                        status: 200,
                        error: err
                    })
                })
            }
        })
    } else {
        return res.send({
            message: 'token required',
            responseCode: 600
        })
    }

}