const nekoslife = require('nekos.life');
const neko = new nekoslife();
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
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
