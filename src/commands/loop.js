const handler = require('../utils/musichandler').modules;

module.exports.run = async(client, message, args) => {
    let serverQueue = handler.queue.get(message.guild.id)
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
        return message.channel.send(`${utils.error} Necesitas estar en un canal de voz para ejecutar ese comando!`)
    }
    if (!serverQueue) {
        return message.channel.send(`${utils.error} No hay nada reproduciendose ahora mismo.`)
    } else {
        serverQueue.loop = !serverQueue.loop;
        return message.channel.send(`${utils.info} Se ${serverQueue.loop ? "habilito" : "deshabilito"} el loop.`);
    }
}