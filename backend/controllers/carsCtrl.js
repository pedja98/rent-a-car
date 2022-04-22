const { Op } = require('sequelize')
const { Cars } = require('../models/index')

const getCars = (req, res) => {
    Cars.findAll()
        .then((row) => res.json(row))
        .catch((err) => console.log(err))
}


const searchCars = (req, res) => {
    const { brand, model, color, priceTo } = req.query

    if (brand === '' && model === '' && color === '' && priceTo == -1) {
        Cars.findAll()
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand !== '' && model === '' && color === '' && priceTo == -1) {
        Cars.findAll({
            where: {
                brand: {
                    [Op.like]: `%${brand}%`
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand === '' && model !== '' && color === '' && priceTo == -1) {
        Cars.findAll({
            where: {
                model: {
                    [Op.like]: `%${model}%`
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand === '' && model === '' && color !== '' && priceTo == -1) {
        Cars.findAll({
            where: {
                color: {
                    [Op.like]: `%${color}%`,
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand === '' && model === '' && color === '' && priceTo != -1) {
        Cars.findAll({
            where: {
                price: {
                    [Op.lte]: priceTo
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand !== '' && model !== '' && color === '' && priceTo == -1) {
        Cars.findAll({
            where: {
                brand: {
                    [Op.like]: `%${brand}%`
                },

                model: {
                    [Op.like]: `%${model}%`
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand !== '' && model === '' && color !== '' && priceTo == -1) {
        Cars.findAll({
            where: {
                brand: {
                    [Op.like]: `%${brand}%`
                },

                color: {
                    [Op.like]: `%${color}%`
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand !== '' && model === '' && color === '' && priceTo != -1) {
        Cars.findAll({
            where: {
                brand: {
                    [Op.like]: `%${brand}%`
                },

                price: {
                    [Op.lte]: priceTo
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand === '' && model !== '' && color !== '' && priceTo == -1) {
        Cars.findAll({
            where: {
                model: {
                    [Op.like]: `%${model}%`
                },

                color: {
                    [Op.like]: `%${color}%`
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand === '' && model !== '' && color === '' && priceTo != -1) {
        Cars.findAll({
            where: {
                model: {
                    [Op.like]: `%${model}%`
                },

                price: {
                    [Op.lte]: priceTo
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand === '' && model === '' && color !== '' && priceTo != -1) {
        Cars.findAll({
            where: {
                color: {
                    [Op.like]: `%${color}%`
                },

                price: {
                    [Op.lte]: priceTo
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand !== '' && model !== '' && color !== '' && priceTo == -1) {
        Cars.findAll({
            where: {
                brand: {
                    [Op.like]: `%${brand}%`
                },

                model: {
                    [Op.like]: `%${model}%`
                },

                color: {
                    [Op.like]: `%${color}%`
                },
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand !== '' && model !== '' && color === '' && priceTo != -1) {
        Cars.findAll({
            where: {
                brand: {
                    [Op.like]: `%${brand}%`
                },

                model: {
                    [Op.like]: `%${model}%`
                },

                price: {
                    [Op.lte]: priceTo
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand === '' && model !== '' && color !== '' && priceTo != -1) {
        Cars.findAll({
            where: {
                model: {
                    [Op.like]: `%${model}%`
                },

                color: {
                    [Op.like]: `%${color}%`
                },

                price: {
                    [Op.lte]: priceTo
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }

    if (brand !== '' && model !== '' && color !== '' && priceTo != -1) {
        Cars.findAll({
            where: {
                model: {
                    [Op.like]: `%${model}%`
                },

                brand: {
                    [Op.like]: `%${brand}%`
                },

                color: {
                    [Op.like]: `%${color}%`
                },

                price: {
                    [Op.lte]: priceTo
                }
            }
        })
            .then((row) => res.json(row))
            .catch((err) => console.log(err))
    }
}

const addCar = (req, res) => {
    let filename;
    if(req.file === undefined) {
        filename = null
    }
    else {
        filename = 'http://localhost:3000/images/' + req.file.filename
    }

    Cars.create({
        plate_num: req.body.plate_num,
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        color: req.body.color,
        pic: filename
    })
    .then(() => res.json({ created: true }))
    .catch((err) => console.log(err))
}

module.exports = {
    getCars,
    searchCars,
    addCar
}