const express = require('express');

const router = express.Router();

const Apartment = require('../models/Apartment');

let errorMessage = 'The requested information could not be found';

/* POST apartment add. */
router.post('/', function (req, res, next) {
    const apartment = new Apartment(req.body);

    const process = apartment.save();
    process.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

/* GET apartment list. */
router.get('/', function (req, res) {
    const apartment = Apartment.find({});

    apartment.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json(err);
    });
})

/* GET apartment list by ID. */
router.get('/:id', function (req, res, next) {
    const apartment = Apartment.findById(req.params.id);

    apartment.then((data) => {
        if (!data) {
            next({message: errorMessage});
            return;
        }
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json(err);
    });
})

/* PUT apartment update. */
router.put('/:id', function (req, res, next) {
    Apartment.findById(req.params.id).then((data) => {
        data.set(req.body);
        return data.save();
    }).then((data) => {
        res.json(data);
    }).catch(() => {
        next({message: errorMessage});
    });
})

module.exports = router;
