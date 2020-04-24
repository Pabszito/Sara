const Discord = require('discord.js');
const botconfig = require('../storage/botconfig.json');
const Weez = require('weez');
const weez = new Weez.WeezAPI(botconfig.weezkey);
const utils = require('../utils.json');

module.exports.run = async (client, message, args) => {

    let target = message.mentions.users.first();
    if (message.author === target) return message.channel.sendMessage(`${utils.error} Te acaricias a ti mismo?`);
    if (target.id === client.user.id) return message.channel.sendMessage(`${utils.error} Conmigo no.`);
    if (!target) return message.channel.send(`${utils.error} Debes mencionar a alguien.`);

    let pat = await weez.randomPat();
    let attachment = new Discord.Attachment(pat, 'pat.gif')

    let embed = new Discord.RichEmbed()
        .setTitle("...")
        .setDescription(`${target}, ${message.author} ha decidido acariciarte.`)
        .setColor("#EE82EE")
        .attachFile(attachment)
        .setImage(`attachment://pat.gif`)
        .setFooter("Bot desarrollado por Pabszito#7777");

    message.channel.send(embed);
}

module.exports.help = {
    name: "pat"
}
