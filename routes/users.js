const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('../models/Apartment');

const router = express.Router();

let errorMessage = 'The requested information could not be found';

/* POST user add. */
router.post('/', async function (req, res, next) {
    try {
        let user = new User(req.body);

        let apartment = await Apartment.findById(user.apartment_id);

        if (!apartment) {
            res.status(404).json({error: {message: 'Apartment Not Found.'}});
            return;
        }

        let capacityCount = await User.find({apartment_id: user.apartment_id}).count()

        if (capacityCount >= apartment.capacity) {
            res.status(400).json({error: {message: 'The building you are trying to add a user to is full.'}});
            return;
        }

        let userData = await user.save();
        res.status(200).json(userData);

    } catch (err) {
        next(err);
    }
});

/* GET users list. */
router.get('/', async function (req, res) {
    let users = await User.aggregate([
        {
            $lookup: {
                from: 'apartments',
                localField: 'apartment_id',
                foreignField: '_id',
                as: 'apartment'
            }
        }, {
            $unwind: {
                path: '$apartment',
            }
        }, {
            $group: {
                _id: {
                    _id: '$id',
                    name: '$name',
                    surname: '$surname',
                    phone_number: '$phone_number',
                    email: '$email',
                    birth_date: '$birth_date',
                    apartment_id: '$apartment_id',
                    created_at: '$created_at',
                },
                apartment: {
                    $push: '$apartment',
                }
            }
        }
    ]);

    if (users.length < 1) {
        res.status(404).json({error: {message: 'Users Not Found.'}});
        return;
    }

    res.status(200).json(users);
});

/* GET user list by ID. */
router.get('/:id', async function (req, res) {
    let users = await User.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.id),
            },
        },
        {
            $lookup: {
                from: 'apartments',
                localField: 'apartment_id',
                foreignField: '_id',
                as: 'apartment'
            }
        }, {
            $unwind: {
                path: '$apartment',
            }
        }, {
            $group: {
                _id: {
                    _id: '$id',
                    name: '$name',
                    surname: '$surname',
                    phone_number: '$phone_number',
                    email: '$email',
                    birth_date: '$birth_date',
                    apartment_id: '$apartment_id',
                    created_at: '$created_at',
                },
                apartment: {
                    $push: '$apartment',
                }
            }
        }
    ]);

    if (users.length < 1) {
        res.status(404).json({error: {message: 'User Not Found.'}});
        return;
    }

    res.status(200).json(users);
});

/* PUT user update. */
router.put('/:id', function (req, res, next) {
    User.findById(mongoose.Types.ObjectId(req.params.id)).then((data) => {
        data.set(req.body);
        return data.save();
    }).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        next({message: err.message});
    });
});

/* DELETE user. */
router.delete('/:id', function (req, res, next) {
    User.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id)).then((data) => {
        if (!data) {
            next({message: errorMessage});
            return;
        }
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

module.exports = router;
