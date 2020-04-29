const Discord = require('discord.js');
const botconfig = require('../storage/botconfig.json');
const Weez = require('weez');
const weez = new Weez.WeezAPI(botconfig.weezkey);
const utils = require('../utils/utilities.json');

module.exports.run = async (client, message, args) => {

    let target = message.mentions.users.first();
    if (target.id === client.user.id || message.author.id === target.id || !target) target = client.user;
    
    let pat = await weez.randomPat();
    let attachment = new Discord.Attachment(pat, 'pat.gif')

    let embed = new Discord.RichEmbed()
        .setTitle("...")
        .setDescription(message.author.id != client.user.id ? `${message.author} te acaricio, ${target}.` : `Ten una palmadita de mi parte, ${target}.`)
        .setColor("#EE82EE")
        .attachFile(attachment)
        .setImage(`attachment://pat.gif`)
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    message.channel.send(embed);
}

module.exports.help = {
    name: "pat"
}
