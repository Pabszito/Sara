const Discord = require('discord.js')
const utils = require('../utils.json')

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${utils.error} No tienes permisos para ejecutar ese comando.`);

    if (!message.channel.permissionsFor(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${utils.error} Necesito el permiso \`MANAGE_MESSAGES\` para ejecutar ese comando!`);

    if (!args[0]) return message.channel.send(`${utils.error} Necesitas especificar un numero de mensajes a eliminar!`);

    let messagecount = parseInt(args[0]);

    if (messagecount > 101 || messagecount <= 0) return message.channel.send(`${utils.error} Necesitas especificar un numero de mensajes a eliminar el cual este entre 1 y 100!`);

    message.channel.fetchMessages({limit: messagecount})
        .then(messages => message.channel.bulkDelete(messages)).then(m => message.channel.send(`${utils.info} Se eliminaron ${messagecount} mensajes!`));
}

module.exports.help = {
    name: 'clear'
}
