const Discord = require('discord.js')
const utils = require('../utils/utilities.json');

module.exports.run = async (client, message, args) => {

    // Target and reason
    let target = message.mentions.members.first() || message.guild.member(args[0]);
    let reason = args[1] ? `${args.slice(1).join(" ")}` : `Ninguna razon especificada`;

    // Conditions
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`${utils.error} No tienes permisos para ejecutar ese comando.`);
    if (!target) return message.channel.send(`${utils.error} Necesitas mencionar a una persona.`);
    if (!message.guild.member(target).kickable) return message.channel.send(`${utils.error} No puedo sancionar al usuario especificado.`);

    let bannedFrom = new Discord.RichEmbed()
        .setTitle(`Fuiste baneado de ${message.guild.name}`)
        .addField("Responsable", message.author.tag)
        .addField("Razon", reason)
        .addField("Tiempo", "Permanente")
        .setColor("#EE82EE")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);
    // This embed will be sent to the user that has been banned.

    try {
        await target.send(bannedFrom);
        // Try to send the ban notification to the user
    }catch(err){
        console.error(`[ERROR] Unable to send the ban notification to ${target.user.tag}`);
        // We were unable to send the ban notification to the user
    }

    await target.ban(reason); // Ban the person

    // Send a message telling that the person was successfully banned
    message.channel.send(`${utils.info} ${target.user.tag} fue baneado del Discord.`);
}

module.exports.help = {
    name: 'ban'
}
