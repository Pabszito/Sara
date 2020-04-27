const utils = require('../utils/utilities.json')

module.exports.run = async (client, message, args) => {

    let serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send(`${utils.error} No hay nada reproduciendose ahora mismo.`);

    return message.channel.send(`${utils.info} La cancion actual es: ${serverQueue.songs[0].title}`);
}

module.exports.help = {
    name: 'np'
}