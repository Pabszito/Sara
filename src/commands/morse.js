const Discord = require('discord.js')
const morse = require('morse-node').create('ITU');
const utils = require('../utils/utilities.json')

module.exports.run = async (client, message, args) => {

    if (!args[0]) return message.channel.send(`${utils.error} Necesitas especificar un texto!`);

    let text = args.slice(0).join(' ');
    let translated = morse.encode(text);

    let embed = new Discord.RichEmbed()
        .setTitle('Traductor morse')
        .setDescription('Tu texto fue traducido! Estos son los resultados:\n**Texto original:** ' + text + "\n**Traducido a morse:** " + translated)
        .setColor("#EE82EE")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);
    message.channel.send(embed);
}

module.exports.help = {
    name: 'morse'
}
