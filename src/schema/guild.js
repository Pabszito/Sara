const mongoose = require('mongoose')

const guild = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    welcomeMessage: {
        type: String,
        default: "Welcome to the server, {mention}!"
    },
    welcomeMessageEnabled: {
        type: Boolean,
        default: false
    },
    farewellMessage: {
        type: String,
        default: "Goodbye, {user}."
    },
    farewellMessageEnabled: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("guild", guild)
