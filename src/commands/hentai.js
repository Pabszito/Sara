const Discord = require('discord.js');
const superagent = require('superagent');
const utils = require('../utils.json');
const nekoslife = require('nekos.life');
const neko = new nekoslife();

module.exports.run = async (client, message, args) => {
    if (message.channel.nsfw === true) {
        let hentai = await neko.nsfw.hentai();
        let embed = new Discord.RichEmbed()
            .setTitle("Aqui esta lo que pedias...")
            .setImage(hentai.url)
            .setColor("#EE82EE")
            .setFooter("Bot desarrollado por Pabszito#7790", client.user.avatarURL);
        message.channel.send(embed);
    } else {
        message.channel.send(`${utils.error} Debes estar en un canal NSFW para utilizar ese comando!`)
    }
};

module.exports.help = {
    name: 'hentai'
};