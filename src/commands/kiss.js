const Discord = require('discord.js');
const botconfig = require('../storage/botconfig.json');
const Weez = require('weez');
const weez = new Weez.WeezAPI(botconfig.weezkey);

module.exports.run = async (client, message, args) => {
    let target = message.mentions.users.first();
    if (message.author === target) return message.channel.sendMessage(`${utils.error} ooohh, eso es triste. Te besaras a ti mismo?`);
    if (target.id === client.user.id) return message.channel.sendMessage(`${utils.error} Conmigo no.`);
    if (!target) return message.channel.send(`${utils.error} Debes mencionar a alguien.`);

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
