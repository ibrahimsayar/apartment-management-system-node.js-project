const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('../models/Transactions');
const User = require("../models/User");
const Apartment = require("../models/Apartment");

const router = express.Router();

let errorMessage = 'The requested information could not be found';

/* POST bill create. */
router.post('/bill/create', async function (req, res, next) {
    try {
        let transaction = req.body;

        let userInformation = await User.findById(mongoose.Types.ObjectId(transaction.user_id));

        if (!userInformation) {
            res.status(404).json({error: {message: 'User Not Found.'}});
            return;
        }
        transaction.apartment_id = userInformation.apartment_id;

        let data = new Transaction(transaction);
        let transactionData = await data.save();

        res.status(200).json(transactionData);
    } catch (err) {
        next(err);
    }
});

/* DELETE bill. */
router.delete('/bill/delete/:id', function (req, res, next) {
    Transaction.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id)).then((data) => {
        if (!data) {
            next({message: errorMessage});
            return;
        }
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

/* PUT bill update. */
router.put('/bill/status/:id', function (req, res, next) {
    Transaction.findById(mongoose.Types.ObjectId(req.params.id)).then((data) => {
        data.set(req.body);
        return data.save();
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        next({message: err.message});
    });
});

/* GET user bills. */
router.get('/user/list-bills/:id', function (req, res) {
    const bills = Transaction.find({user_id: req.params.id});

    bills.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

/* GET unpaid bills. */
router.get('/user/unpaid-bills-total/:id', async function (req, res) {
    let totalUnpaidBills = await Transaction.aggregate(
        [
            {
                $match: {
                    user_id: mongoose.Types.ObjectId(req.params.id),
                    status: false,
                }
            },
            {
                $group: {
                    _id: null,
                    total: {$sum: "$amount"}
                }
            }
        ]);

    if (!totalUnpaidBills) {
        res.status(400).json({total: 0});
    }
    res.status(400).json({total: totalUnpaidBills[0].total});
});

/* GET paid bills. */
router.get('/user/paid-bills-total/:id', async function (req, res) {
    let totalPaidBills = await Transaction.aggregate(
        [
            {
                $match: {
                    user_id: mongoose.Types.ObjectId(req.params.id),
                    status: true,
                }
            },
            {
                $group: {
                    _id: null,
                    total: {$sum: "$amount"}
                }
            }
        ]);

    if (!totalPaidBills) {
        res.status(400).json({total: 0});
    }
    res.status(400).json({total: totalPaidBills[0].total});
});

/* GET apartment bills. */
router.get('/apartment/list-bills/:id', function (req, res) {
    const bills = Transaction.find({apartment_id: req.params.id});

    bills.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

/* GET apartment total bills. */
router.get('/apartment/total/:id', async function (req, res) {
    let totalBuildingBills = await Transaction.aggregate(
        [
            {
                $match: {
                    apartment_id: mongoose.Types.ObjectId(req.params.id),
                    status: false,
                }
            },
            {
                $group: {
                    _id: null,
                    total: {$sum: "$amount"}
                }
            }
        ]);

    if (!totalBuildingBills) {
        res.status(400).json({total: 0});
    }
    res.status(400).json({total: totalBuildingBills[0].total});
});

module.exports = router;
