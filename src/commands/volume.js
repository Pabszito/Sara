const Discord = require('discord.js');
const handler = require('../utils/musichandler').modules;
const utils = require('../utils/utilities.json');

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
            if(args[0] > 200){
                return message.channel.send(`${utils.error} El volumen especificado es muy alto!`)
            }
            if(args[0] > 100){
                message.channel.send(`${utils.warning} Escuchar a un volumen tan alto **no es recomendado**!`)
            }
            serverQueue.volume = args[0];
            await serverQueue.connection.dispatcher.setVolume(args[0] / 100);
            message.channel.send(`${utils.info} Volumen establecido a \`${args[0]}\`.`)
        }catch(err){
            return message.channel.send(`${utils.error} El volumen especificado no es valido.`);
        }
    }
}

module.exports.help = {
    name: 'volume'
}