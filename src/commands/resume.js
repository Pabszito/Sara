const handler = require('../utils/musichandler').modules;
const utils = require('../utils/utilities.json');

module.exports.run = async(client, message, args) => {
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
        return message.channel.send(`${utils.error} Necesitas estar en un canal de voz para ejecutar ese comando!`);
    }
    let serverQueue = handler.queue.get(message.guild.id)
    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        message.channel.send(`${utils.info} Se reanudo la cancion actual.`)
    }
    if(!serverQueue) {
        return message.channel.send(`${utils.error} No hay nada sonando en este servidor!`)
    }
}