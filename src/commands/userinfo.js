const Discord = require('discord.js');
const userstatus = {
    online: "<:online:622316661298561034> En linea",
    idle: "<:idle:622316661336309760> Ausente",
    dnd: "<:dnd:622316660745043968> No molestar",
    offline: "<:offline:622316661328052226> Desconectado/Invisible"
}

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " un dia" : " dias") + " atras";
};

module.exports.run = async (client, message, args) => {
    let target = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    let embed = new Discord.RichEmbed()
        .setTitle("Informacion")
        .setDescription("Aqui esta la informacion que estabas pidiendo.")
        .addField("Nombre completo:", target.user.tag, false)
        .addField("Bot:", `${target.user.bot ? "Si" : "No"}`, false)
        .addField("ID:", target.user.id, false)
        .addField("Nickname:", `${target.user.nickname ? nickname : "Ninguno"} `, false)
        .addField("Estado:", userstatus[target.user.presence.status], false)
        .addField("Fecha de creacion:", `${target.user.createdAt.toUTCString().substr(0, 16)} (${checkDays(target.user.createdAt)})`, false)
        .addField("Roles", `${target.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" , ") || "Sin roles"}`, false)
        .setColor("#EE82EE")
        .setFooter('Bot desarrollado por Pabszito#7777', client.user.avatarURL); // footer
    message.channel.send({embed});
}
module.exports.help = {
    name: "userinfo"
}
