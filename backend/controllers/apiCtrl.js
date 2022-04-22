
const jwt = require('jsonwebtoken');
const {Users} = require('../models/index');

const signIn = (req, res) => {
    Users.findOne({
            attributes: [
                "username",
                "type",
                "name"
            ],
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        .then((user) => {
            if (user == null) {
                res.json({
                    'found': false
                })
            } else {
                const token = jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET)
                res.json({
                    'username': user.username,
                    'type': user.type,
                    'name': user.name,
                    'found': true,
                    'token': token
                })
            }
        })
        .catch((err) => console.log(err))
}

const addUser = (req, res) => {
    Users.findOne({
            attributes: [
                "username",
            ],
            where: {
                username: req.body.username,
            }
        })
        .then((user) => {
            if (user != null) {
                res.json({
                    usernameTaken: true
                })
            } else {
                Users.findOne({
                        attributes: [
                            "email",
                        ],
                        where: {
                            email: req.body.email,
                        }
                    })
                    .then((user) => {
                        if (user != null) {
                            res.json({
                                emailTaken: true
                            })
                        } else {
                            Users.create({
                                    username: req.body.username,
                                    password: req.body.password,
                                    type: req.body.type,
                                    name: req.body.name,
                                    email: req.body.email,
                                    surname: req.body.surname,
                                    address: req.body.address,
                                })
                                .then((user) => res.json({ created: true }))
                                .catch((err) => console.log(err))
                        }
                    })
                    .catch((err) => console.log(err))
            }
        })
        .catch((err) => console.log(err))
}

module.exports = {
    signIn,
    addUser,
}