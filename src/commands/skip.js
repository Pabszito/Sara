const utils = require('../utils/utilities.json');
const handler = require('../utils/musichandler').modules;

module.exports.run = async(client, message, args) => {
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
        return message.channel.send(`${utils.error} Necesitas estar en un canal de voz para ejecutar ese comando.`)
    }
    let serverQueue = handler.queue.get(message.guild.id)
    if (!serverQueue) {
        return message.channel.send(`${utils.error} No hay nada reproduciendose en este servidor.`)
    }
    if(serverQueue && voiceChannel) {
        serverQueue.connection.dispatcher.end('Skipped');
        message.channel.send(`${utils.info} Se salto la cancion actual.`);
    }
}

module.exports.help = {
    name: 'skip'
}