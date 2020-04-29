const handler = require('../utils/musichandler').modules;
const utils = require('../utils/utilities.json');

module.exports.run = async(client, message, args) => {
    let serverQueue = handler.queue.get(message.guild.id)
    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.channel.send(`${utils.error} Debes estar en un canal de voz para ejecutar ese comando!`)
    }
    if (!serverQueue) {
        return message.channel.send(`${utils.error} No hay nada sonando ahora mismo.`)
    } else {
        serverQueue.connection.dispatcher.end();
        handler.queue.delete(message.guild.id)
        return message.channel.send(`${utils.info} Se freno el reproductor.`)
    }
}

module.exports.help = {
    name: 'stop'
}
