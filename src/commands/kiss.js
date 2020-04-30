const Discord = require('discord.js');
const botconfig = require('../storage/botconfig.json');
const Weez = require('weez');
const weez = new Weez.WeezAPI(botconfig.weezkey);
const utils = require('../utils/utilities.json');

module.exports.run = async (client, message, args) => {
    let target = message.mentions.users.first();
    if (!target) return message.channel.send(`${utils.error} Debes mencionar a alguien.`);
    if (message.author === target) return message.channel.send(`${utils.error} Te besaras a ti mismo? Porque yo no te dare un beso..`);
    if (target.id === client.user.id) return message.channel.send(`${utils.error} Conmigo no...`);

    let kiss = await weez.randomBeso();
    let attachment = new Discord.Attachment(kiss, 'kiss.gif')

    let embed = new Discord.RichEmbed()
        .setTitle("...")
        .setDescription(`${target}, has recibido un beso por parte de ${message.author}`)
        .setColor("#EE82EE")
        .attachFile(attachment)
        .setImage(`attachment://kiss.gif`)
        .setFooter("Bot desarrollado por Pabszito#7777");

    message.channel.send(embed);
}

module.exports.help = {
    name: "kiss"
}
