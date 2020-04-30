const handler = require('../utils/musichandler').modules;
const {RichEmbed} = require('discord.js');
const utils = require('../utils/utilities.json');

module.exports.run = async(client, message, args) => {
    let serverQueue = handler.queue.get(message.guild.id)
    if (!serverQueue) {
        return message.channel.send(`${utils.error} No hay nada sonando ahora mismo!`)
    } else {
        let embed = new RichEmbed()
            .setColor("#EE82EE")
            .setTitle(`Cola de canciones para ${message.guild.name}`)
            .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

        if (serverQueue.songs.length > 1) {
            embed.addField("Sonando ahora mismo:", serverQueue.songs[0].title);
            embed.addField("A continuacion:", serverQueue.songs[1].title);
        } else {
            embed.addField("Sonando ahora mismo:", serverQueue.songs[0].title);
        }
        return message.channel.send(embed);
    }
}

module.exports.help = {
    name: 'queue'
}