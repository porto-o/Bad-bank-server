const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    transactions: [{
        type: {
            type: String, // "deposit", "withdrawal", etc.
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        // You can add other properties specific to each transaction
    }],
    balance: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
