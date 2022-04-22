const cars = require('express').Router()
const carsCtrl = require('../controllers/carsCtrl');
const upload = require('../multer/multer')
const { tokenVerify } = require("../helpers/tokenVerify")

cars.get("/search", carsCtrl.searchCars)

cars.get("/", carsCtrl.getCars)

cars.post("/search", tokenVerify, carsCtrl.searchCars)

cars.post("/", tokenVerify, carsCtrl.getCars)

cars.post("/add-car", upload.single('file'), tokenVerify, carsCtrl.addCar)

module.exports = cars