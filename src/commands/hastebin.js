const Discord = require('discord.js');
const hastebin = require('hastebin-gen');
const utils = require('../utils.json');

module.exports.run = (client, message, args) => {
    let haste = args.slice(0).join(" ")
    let type = args.slice(1).join(" ")
    if (!args[0]) {
        return message.channel.send(`${utils.error} Debes especificar algo, ya sea codigo o texto.`)
    }

    message.channel.send(`${utils.info} Subiendo, si nunca se obtiene una respuesta es porque Hastebin no se encuentra disponible.`);

    hastebin(haste).then(r => {
        let embed = new Discord.RichEmbed()
            .setTitle("Hastebin")
            .setDescription(`Tu post fue creado con exito! Puedes verlo en ${r} cuando tu quieras.`)
            .setColor("#EE82EE")
            .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);
        message.channel.send(embed);
    });
}

module.exports.help = {
    name: "hastebin"
}
