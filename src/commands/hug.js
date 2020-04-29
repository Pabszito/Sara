const Discord = require('discord.js');
const botconfig = require('../storage/botconfig.json');
const utils = require('../utils/utilities.json');
const Weez = require('weez');
const weez = new Weez.WeezAPI(botconfig.weezkey);

module.exports.run = async (client, message, args) => {
    let target = message.mentions.users.first();
    if (!target) target = client.user;
    if (target === message.author) return message.channel.send(`${utils.error} Te intentas abrazar a ti mismo?`);

    let img = await weez.randomAbrazo();
    let attachment = new Discord.Attachment(img, 'hug.gif');

    let embed = new Discord.RichEmbed()
        .setTitle("...")
        .setDescription(target.id != client.user.id ? `${target}, has recibido un abrazo por parte de ${message.author}` : `Ten un abrazo de mi parte, ${message.author}.`)
        .setColor("#EE82EE")
        .attachFile(attachment)
        .setImage(`attachment://hug.gif`)
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    await message.channel.send(embed);
}

module.exports.help = {
    name: "hug"
}
