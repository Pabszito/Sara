const Discord = require('discord.js');
const hastebin = require('hastebin-gen');
const utils = require('../utils/utilities.json');

module.exports.run = (client, message, args) => {
    let haste = args.slice(0).join(" ")

    if (!args[0]) {
        return message.channel.send(`${utils.error} Debes especificar algo, ya sea codigo o texto.`)
    }

    message.channel.send(`${utils.info} Subiendo...`);

    try {
        hastebin(haste).then(r => {
            let embed = new Discord.RichEmbed()
                .setTitle("Hastebin")
                .setDescription(`Tu post fue creado con exito! Puedes verlo en ${r} cuando tu quieras.`)
                .setColor("#EE82EE")
                .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);
            message.channel.send(embed);
        });
    }catch(err){
        message.channel.send(`${utils.error} No se pudo subir lo que especificaste a Hastebin. Puede que no se encuentre disponible.`)
    }
}

module.exports.help = {
    name: "hastebin"
}
