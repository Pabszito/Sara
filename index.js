const Discord = require("discord.js");
      config = require("./config.json");
      mongoose = require('mongoose');
      client = new Discord.Client({disableMentions: "none"});

client.commands = new Map();
client.config = config;

mongoose.connect(config.database_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if(err) {
        console.error(`[ERROR] Unable to connect to the Mongo database.`);
        return process.exit(1);
    }
    console.info(`[INFO] Connected to the Mongo database.`)
});

["command", "event"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.login(config.token)
    .then(() => console.log(`[INFO] Logged in as "${client.user.tag}"`))
    .catch(err => console.error(`[ERROR] Unable to login: ${err}`));