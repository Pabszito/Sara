const utils = require('../utils/utilities.json');

module.exports.run = async(client, message, args) => {
    let voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
        return message.channel.send(`${utils.error} Necesitas estar en un canal de voz para ejecutar ese comando!`);
    } else {
        voiceChannel.join();
        message.channel.send(`${utils.info} Me uni al canal de voz \`${voiceChannel.name}\`.`);
    }
}

module.exports.help = {
    name: 'join'
}