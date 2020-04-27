const utils = require('../utils/utilities.json')

module.exports.run = async (client, message, args) => {

    let serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send(`${utils.info} Reanudando la cancion que estaba sonando...`);
    }
    return message.channel.send(`${utils.error} No hay nada reproduciendose ahora mismo.`);
}

module.exports.help = {
    name: 'resume'
}