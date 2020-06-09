const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Ping")
        .setDescription("📡 El ping del bot es de `" + Math.round(client.ping) + " ms` desde Glitch.")
        .setColor("#EE82EE")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);
    message.channel.send(embed);
}

module.exports.help = {
    name: "ping"
}
