const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    id: String,
    prefix: String,
    welcomeChannelId: String,
    welcomeEnabled: {
        type: Boolean,
        default: false
    },
    welcomeMessage: {
        type: String,
        default: "Welcome to the server, `$user`!"
    },
    farewellChannelId: String,
    farewellEnabled: {
        type: Boolean,
        default: false
    },
    farewellMessage: {
        type: String,
        default: "Goodbye, `$user`."
    },
    language: {
        type: String,
        default: "en"
    }
});

module.exports = mongoose.model("Guild", guildSchema);
