const Discord = require('discord.js');
const nekoslife = require('nekos.life');
const neko = new nekoslife();

module.exports.run = async (client, message, args) => {

    if (message.channel.nsfw === true) {
        let neko = await neko.nsfw.neko();
        let embed = new Discord.RichEmbed()
            .setTitle("...")
            .setImage(neko.url)
            .setColor("#EE82EE")
            .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);
        message.channel.send(embed)
    } else {
        message.channel.send(`${utils.error} Debes estar en un canal NSFW para utilizar ese comando!`)
    }
};

module.exports.help = {
    name: 'neko'
};
