const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'The {PATH} field is required.'],
        minlength: [1, 'The {PATH} field must be at least {MINLENGTH} characters in length.'],
        maxlength: [100, 'The {PATH} field cannot exceed {MAXLENGTH} characters in length.'],

    },
    address: {
        type: String,
        required: [true, 'The {PATH} field is required.'],
        minlength: [10, 'The {PATH} field must be at least {MINLENGTH} characters in length.'],
        maxlength: [500, 'The {PATH} field cannot exceed {MAXLENGTH} characters in length.'],
    },
    capacity: {
        type: Number,
        required: [true, 'The {PATH} field is required.'],
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('apartment', ApartmentSchema);