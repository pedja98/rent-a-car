const rents = require('express').Router()
const rentsCtrl = require('../controllers/rentsCtrl')
const { tokenVerify } = require("../helpers/tokenVerify")

rents.post("/user", tokenVerify, rentsCtrl.getRentsUser)

rents.post("/add-rent", tokenVerify, rentsCtrl.addRent)

rents.post("/cancle", tokenVerify, rentsCtrl.cancleRent)

rents.post("/", tokenVerify, rentsCtrl.getRents)

rents.post("/profit_by_car", tokenVerify, rentsCtrl.profitByCar)

rents.post("/profit_by_date", tokenVerify, rentsCtrl.profitByDate)

module.exports = rents