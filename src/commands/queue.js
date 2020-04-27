const Discord = require('discord.js');
const utils = require('../utils/utilities.json')

module.exports.run = async (client, message, args) => {

    let serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send(`${utils.error} No hay nada reproduciendose ahora mismo.`);
    let embed = new Discord.RichEmbed()
        .setTitle("Cola para " + message.guild.name)
        .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}\n**Reproduciendose ahora mismo:** ${serverQueue.songs[0].title}`)
        .setColor("#ee82ee")
        .setFooter("Bot desarrollado por Pabszito#7790", client.user.avatarURL);
    message.channel.send(embed);
}

module.exports.help = {
    name: 'queue'
}