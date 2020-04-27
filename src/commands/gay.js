const Discord = require('discord.js');
const botconfig = require('../storage/botconfig.json');
var Weez = require('weez');
var weez = new Weez.WeezAPI(botconfig.weezkey);
const utils = require('../utils/utilities.json');

module.exports.run = async (client, message, args) => {
    let target = message.mentions.users.first();
    if (message.mentions.users.size < 1) target = message.author;

    let gay = await weez.rainbow(target.avatarURL);

    let attachment = new Discord.Attachment(gay, 'gay.png');
    let embed = new Discord.RichEmbed()
        .setTitle("...")
        .setColor("#EE82EE")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
        .setImage(attachment);

    message.channel.send(embed);
}

module.exports.help = {
    name: 'gay'
}
