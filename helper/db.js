const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/apartment_management_system');
    mongoose.connection.on('open', () => {})
    mongoose.connection.on('error', () => {});

    mongoose.Promise = global.Promise;
};