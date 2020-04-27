const Discord = require('discord.js');
const botconfig = require('../storage/botconfig.json');
const Weez = require('weez');
const weez = new Weez.WeezAPI(botconfig.weezkey);
const utils = require('../utils/utilities.json');

module.exports.run = async (client, message, args) => {
    let target = message.mentions.users.first();
    if (message.mentions.users.size < 1) target = message.author;

    if (target.id === client.user.id) return message.channel.send(`${utils.error} No, yo no soy basura..`);

    let trash = await weez.basura(target.displayAvatarURL);

    let attachment = new Discord.Attachment(trash, 'basura.png');
    let embed = new Discord.RichEmbed()
        .setTitle("...")
        .setDescription(`${target === message.author ? "Te consideras basura?" : "confirmo, esto es basura"}`)
        .attachFile(attachment)
        .setImage('attachment://basura.png')
        .setColor("#EE82EE")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    message.channel.send(embed);
}

module.exports.help = {
    name: 'basura'
}
