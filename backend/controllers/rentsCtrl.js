const { Rents, Cars, sequelize } = require('../models/index');
const { Op } = require('sequelize')

const getRentsUser = (req, res) => {
    Rents.findAll({
        attributes: ['ID', 'date_of_renting', 'date_of_return', 'cancelled', 'cost'],
        //include: ['car'],
        include: [{
            model: Cars,
            as: 'car',
            attributes: ['brand', 'model', 'color', 'price']
            //where:{}
        }],
        where: {
            username: req.body.username
        },
        order: [
            ['ID', 'DESC'],
        ],
    })
        .then((row) => res.json(row))
        .catch((err) => console.log(err))
}

const addRent = (req, res) => {
    Rents.findOrCreate({
        where: {
            plate_num: req.body.plate_num,

            cancelled: 'n',

            [Op.or]: {
                date_of_renting: {
                    [Op.gte]: req.body.rentDate,
                    [Op.lte]: req.body.returnDate,
                },
                date_of_return: {
                    [Op.gte]: req.body.rentDate,
                    [Op.lte]: req.body.returnDate,
                }
            },
        },
        defaults: {
            date_of_renting: req.body.rentDate,
            date_of_return: req.body.returnDate,
            cancelled: 'n',
            username: req.body.username,
            plate_num: req.body.plate_num,
            cost: req.body.cost,
            created_at: new Date().setHours(0, 0, 0, 0),
        }
    })
        .then((data) => {
            let [rent, created] = data
            res.json({ created })
        })
        .catch((err) => console.log(err))

}

const cancleRent = (req, res) => {
    Rents.update({ cancelled: 'c' }, {
        where: {
            ID: req.body.ID
        }
    })
        .then(() => { res.json({ updated: true }) })
        .catch(err => { res.json({ err }) })
}

const getRents = (req, res) => {
    Rents.findAll(
        {
            attributes: ['created_at','date_of_renting', 'date_of_return', 'cancelled', 'cost', 'username'],
            include: [{
                model: Cars,
                as: 'car',
                attributes: ['brand', 'model']
            }]
        }
    )
        .then((data) => res.json(data))
        .catch((err) => console.log(err))
}

const profitByCar = (req, res) => {
    Rents.findAll(
        {
            attributes: [
                "plate_num",
                [sequelize.fn('sum', sequelize.col('cost')), 'total_cost']
            ],
            include: [{
                model: Cars,
                as: 'car',
                attributes: ['brand', 'model']
            }],
            where: {
                cancelled: "n",
                $and: sequelize.where(sequelize.fn("month", sequelize.col("created_at")), (new Date()).getMonth() + 1)
            },
            group: ["plate_num"],
            order: [[sequelize.col("total_cost"), "DESC"]],
        }
    )
        .then((data) => res.json(data))
        .catch((err) => console.log(err))
}

const profitByDate = (req, res) => {
    Rents.findAll(
        {
            attributes: [
                "created_at",
                [sequelize.fn('sum', sequelize.col('cost')), 'total_cost']
            ],
            where: {
                cancelled: "n",
                $and: sequelize.where(sequelize.fn("month", sequelize.col("created_at")), (new Date()).getMonth() + 1)
            },
            group: ["created_at"],
            order: [[sequelize.col("total_cost"), "DESC"]],
        }
    )
        .then((data) => res.json(data))
        .catch((err) => console.log(err))
}

module.exports = {
    getRentsUser,
    addRent,
    cancleRent,
    getRents,
    profitByCar,
    profitByDate
}