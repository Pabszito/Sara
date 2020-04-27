const Discord = require('discord.js');
const prefixes = require('../storage/prefix.json');
const utils = require('../utils/utilities.json');
const path = require('path');

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_GUILD") && args[0]) {
        return message.channel.send(`${utils.error} No tienes permisos para ejecutar ese comando.`)
    }

    let prefix = "s!";
    if (prefixes.hasOwnProperty("g" + message.guild.id)) {
        prefix = prefixes["g" + message.guild.id];
    }

    let embed = new Discord.RichEmbed()
        .setTitle("Prefix")
        .setDescription(`El prefix actual para \`${message.guild.name}\` es \`${prefix}\`.\nSi deseas establecer un prefix, utiliza \`${prefix}prefix <prefix>\``)
        .setColor("#ee82ee")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    if (!args[0]) return message.channel.send(embed);

    message.channel.send(`${utils.refresh} Se esta actualizando la configuracion, por favor espera...`);

    let newPrefix = args[0];
    prefixes["g" + message.guild.id] = newPrefix;
    require('fs').writeFile(path.resolve(__dirname, '..') + "/storage/prefix.json", JSON.stringify(prefixes), (err) => {
        if (err) console.error(err);
    });

    message.channel.send(`${utils.info} La configuracion se actualizo con exito. El nuevo prefix es \`${newPrefix}\`.`)
};

module.exports.help = {
    name: 'prefix'
};
