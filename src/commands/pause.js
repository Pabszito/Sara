const handler = require('../utils/musichandler').modules;
const utils = require('../utils/utilities.json');

module.exports.run = async(client, message, args) => {
    let serverQueue = handler.queue.get(message.guild.id)
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
        return message.channel.send(`${utils.error} Necesitas estar en un canal de voz para ejecutar ese comando!`);
    }
    if (!serverQueue) {
        return message.channel.send(`${utils.error} No hay nada sonando ahora mismo!`)
    } else {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        message.channel.send(`${utils.info} Cancion pausada. Usa \`s!resume\` para reanudarla.`);
    }
}