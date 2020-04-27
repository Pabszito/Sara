const Discord = require('discord.js');
const utils = require('../utils/utilities.json')

module.exports.run = async (client, message, args) => {

    if (!args[0]) return message.channel.send(`${utils.error} Que dire?`);

    let text = args.join(" ");

    message.channel.send(text);
}

module.exports.help = {
    name: 'say'
}
