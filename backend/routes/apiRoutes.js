const api = require('express').Router()

const cars = require('./carsRoutes')
const rents = require('./rentsRoutes')
const admin = require('./adminRoutes')

const apiCtrl = require('../controllers/apiCtrl.js')

api.post("/users", apiCtrl.signIn)

api.post("/add-user", apiCtrl.addUser)

api.use("/cars", cars)
api.use("/rents", rents)
api.use("/admin", admin)

module.exports = api
