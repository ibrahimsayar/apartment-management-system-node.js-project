const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/apartment_management_system');
    mongoose.connection.on('open', () => {
        console.log('MongoDB Connected.');
    })
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB Connect Error.', err);
    });

    mongoose.Promise = global.Promise;
};