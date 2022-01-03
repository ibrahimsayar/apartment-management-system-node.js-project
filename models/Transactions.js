const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    id: Schema.Types.ObjectId,
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, 'The {PATH} field is required.'],
        minlength: [1, 'The {PATH} field must be at least {MINLENGTH} characters in length.'],
        maxlength: [200, 'The {PATH} field cannot exceed {MAXLENGTH} characters in length.'],

    },
    apartment_id: {
        type: Schema.Types.ObjectId,
    },
    status: {
        type: Boolean,
        default: false,
        required: [true, 'The {PATH} field is required.'],
    },
    amount: {
        type: Number,
        required: [true, 'The {PATH} field is required.'],
    },
    description: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('transaction', TransactionSchema);