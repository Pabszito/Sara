const utils = require('../utils/utilities.json')

module.exports.run = async (client, message, args) => {

    let {voiceChannel} = message.member;
    if (!voiceChannel) return message.channel.send(`${utils.error} Necesitas estar en un canal de voz para ejecutar ese comando!`);
    let serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send(`${utils.error} No hay nada reproduciendose ahora mismo!`);
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end('Se acabo.');
}

module.exports.help = {
    name: 'stop'
}