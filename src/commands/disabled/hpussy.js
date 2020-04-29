const nekoslife = require('nekos.life');
const neko = new nekoslife();
const Discord = require('discord.js');
const utils = require('../../utils/utilities.json');

module.exports.run = async (client, message, args) => {

    if (message.channel.nsfw === false)
        return message.channel.send(`${utils.error} Debes estar en un canal NSFW para ejecutar ese comando!`);

    let pussy = await neko.nsfw.pussy();
    let embed = new Discord.RichEmbed()
        .setTitle("...")
        .setImage(pussy.url)
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
        .setColor("#EE82EE");
    message.channel.send(embed);
};

module.exports.help = {
    name: 'hpussy'
};
