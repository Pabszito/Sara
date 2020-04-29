// https://media.discordapp.net/attachments/704161623698309141/705102641838948432/unknown.png
const Discord = require('discord.js');
const handler = require('../utils/musichandler').modules;

module.exports.run = async(client, message, args) => {

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
        return message.channel.send(`${utils.error} Necesitas estar en un canal de voz para ejecutar ese comando!`)
    }
    const serverQueue = handler.queue.get(message.guild.id)
    if (!serverQueue) {
        return message.channel.send(`${utils.error} No hay nada sonando ahora mismo!`)
    }
    if (!args[0] || args[0] === '') {
        message.channel.send(`${utils.info} Volumen actual: **${serverQueue.volume}**`)
    } else if (args[0]) {
        try{
            parseInt(args[0]);
            if(args[0] > 100){
                return message.channel.send(`${utils.error} El volumen especificado es muy alto!`)
            }
            serverQueue.volume = args[0];
            await serverQueue.connection.dispatcher.setVolume(volume / 100);
            message.channel.send(`${utils.info} Volumen establecido a \`${volume}\`.`)
        }catch(err){
            return message.channel.send(`${utils.error} El volumen especificado no es valido.`);
        }
    }
}

module.exports.help = {
    name: 'volume'
}