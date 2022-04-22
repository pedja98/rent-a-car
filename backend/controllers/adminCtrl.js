const { Op } = require("sequelize");
const { Users } = require('../models/index');


const getUsers = (req, res) => {
    Users.findAll({
        where: {
            type: {
                [Op.ne]: 'admin',
            },
        },
        order: [
            ['type', 'DESC'],
        ],
    })
        .then(user => res.json(user))
        .catch(err => console.log(err));
};

const deleteUser = (req, res) => {
    Users.destroy({
        where: {
            username: req.body.username,
        },
    })
        .then(() => res.json({ delete: true }))
        .catch(err => console.log(err));
};

const modifyUser = (req, res) => {
    Users.update({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        name: req.body.name,
        surname: req.body.surname,
    }, {
        where: {
            username: req.body.oldUsername
        }
    })
        .then(() => { res.json({ updated: true }) })
        .catch(err => { res.json({ err }) })
};

const addMod = (req, res) => {
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
};

module.exports = {
    getUsers,
    deleteUser,
    modifyUser,
    addMod
};