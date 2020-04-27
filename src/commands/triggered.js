const Discord = require('discord.js');
const botconfig = require('../storage/botconfig.json');
const Weez = require('weez');
const weez = new Weez.WeezAPI(botconfig.weezkey);
const utils = require('../utils/utilities.json');

module.exports.run = async (client, message, args) => {
    let target = message.mentions.users.first();
    if (message.mentions.users.size < 1) target = message.author;

    let triggered = await weez.triggered(target.avatarURL);

    let attachment = new Discord.Attachment(triggered, 'triggered.gif');
    message.channel.send(attachment);
}

module.exports.help = {
    name: 'triggered'
}
