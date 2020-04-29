const Discord = require('discord.js');
const utils = require('../utils/utilities.json');

module.exports.run = async (client, message, args) => {

    if (message.author.id === '447902653842980875') {
        let command = message.content.split(' ').slice(1).join(' ');
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .addField("Code input:", `\`\`\`${command}\`\`\``)
            .addField("Code output:", `\`\`\`${eval(command)}\`\`\``)
            .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);
        return message.channel.send(embed);
    }

    message.channel.send(`${utils.error} No tienes permisos para ejecutar este comando.`);
}

module.exports.help = {
    name: 'eval'
}
