const mongoose = require('mongoose');

const user = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 500
    }
});

module.exports = mongoose.model("user", user)
