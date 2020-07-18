const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: String,
    guildId: String
});

module.exports = mongoose.model("User", userSchema);
