const Discord = require('discord.js');
const utils = require('../utils.json')

module.exports.run = async (client, message, args) => {

    let target = message.mentions.users.first();
    let reason = args[1] ? `${args.slice(1).join()}` : `Ninguna razon especificada`;

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`${utils.error} No tienes permisos para ejecutar ese comando.`);
    if (!target) return message.channel.send(`${utils.error} Necesitas mencionar a una persona.`);
    if (!message.guild.member(target).kickable) return message.channel.send(`${utils.error} No puedo sancionar al usuario especificado.`);

    let kickedFrom = new Discord.RichEmbed()
        .setTitle(`Fuiste kickeado de ${message.guild.name}`)
        .addField("Responsable", message.author.tag)
        .addField("Razon", reason)
        .setColor("#EE82EE")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    target.send(kickedFrom).catch(error => {
        console.error(`No se le pudo enviar un mensaje a ${target.tag}`)
    });
    await message.guild.member(target).kick(reason);

    message.channel.send(`${utils.info} ${target.user.tag} fue kickeado del Discord.`);
}

module.exports.help = {
    name: "kick"
}
