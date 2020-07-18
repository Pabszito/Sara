const Discord = require("discord.js");
const client = new Discord.Client({disableMentions: "none"});
const {safeLoad} = require("js-yaml");
const {readFileSync} = require("fs");
const config = safeLoad(readFileSync("./config.yml", "utf8"));

client.config = config;
client.commands = new Map();

["command", "event"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.login(config.token);
