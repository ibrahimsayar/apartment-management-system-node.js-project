const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-type-phone');
require('mongoose-type-email');

const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'The {PATH} field is required.'],
        minlength: [2, 'The {PATH} field must be at least {MINLENGTH} characters in length.'],
        maxlength: [15, 'The {PATH} field cannot exceed {MAXLENGTH} characters in length.'],

    },
    middle_name: {
        type: String,
        minlength: [2, 'The {PATH} field must be at least {MINLENGTH} characters in length.'],
        maxlength: [20, 'The {PATH} field cannot exceed {MAXLENGTH} characters in length.'],
    },
    surname: {
        type: String,
        required: [true, 'The {PATH} field is required.'],
        minlength: [2, 'The {PATH} field must be at least {MINLENGTH} characters in length.'],
        maxlength: [40, 'The {PATH} field cannot exceed {MAXLENGTH} characters in length.'],
    },
    phone_number: {
        type: mongoose.SchemaTypes.Phone,
        required: [true, 'The {PATH} field is required.'],
        unique: [true, 'The {PATH} field must contain a unique value.'],
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: [true, 'The {PATH} field is required.'],
        unique: [true, 'The {PATH} field must contain a unique value.'],
    },
    birth_date: {
        type: Date,
        required: true,
        min: '1940-01-01',
        max: '2003-01-01',
    },
    apartment_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'The {PATH} field is required.'],
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);