const express = require('express');

const router = express.Router();

const User = require('../models/User');

/* POST user add. */
router.post('/', function (req, res, next) {
    const user = new User(req.body);

    const promise = user.save();
    promise.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(400).json(err);
    });
});

module.exports = router;
