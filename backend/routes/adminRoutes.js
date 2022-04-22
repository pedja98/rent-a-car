const admin = require('express').Router()
const adminCtrl = require('../controllers/adminCtrl')
const { tokenVerify } = require("../helpers/tokenVerify")

admin.post("/users", tokenVerify, adminCtrl.getUsers)

admin.post("/delete", tokenVerify, adminCtrl.deleteUser)

admin.post("/modify", tokenVerify, adminCtrl.modifyUser)

admin.post("/add-mod", tokenVerify, adminCtrl.addMod)

module.exports = admin