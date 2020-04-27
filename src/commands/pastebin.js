const Discord = require('discord.js');
const PastebinAPI = require('pastebin-js');
const botConfig = require('../storage/botconfig.json');
const pastebin = new PastebinAPI({
    'api_dev_key': botConfig.pastebinapikey,
    'api_user_name': botConfig.pastebinusername,
    'api_user_password': botConfig.pastebinuserpassword
})

const utils = require('../utils/utilities.json');

module.exports.run = async (client, message, args) => {
    let paste = args.slice(0).join(" ")
    let type = args.slice(1).join(" ")

    if (!args[0]) return message.channel.send(`${utils.error} Necesitas especiificar algo, ya sea codigo, o un texto comun y corriente..`)

    pastebin
        .createPaste(paste, "Post de " + message.author.tag)
        .then(function (data) {
            let embed = new Discord.RichEmbed()
                .setTitle("Pastebin")
                .setDescription("Tu post fue creado con exito! Puedes verlo en " + data + " cuando tu quieras.\n Raw: https://pastebin.com/raw/" + data.substring(21))
                .setColor("#EE82EE")
                .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);
            message.channel.send(embed);
        })
        .fail(function (err) {
            // Something went wrong
            console.log(err).then(message.channel.send(`${utils.erorr} No se pudo subir lo que especificaste. Puede que https://pastebin.com no se encuentre disponible. Puedes comprobarlo por ti mismo o intentar de nuevo mas tarde.`));
        })
}

module.exports.help = {
    name: "pastebin"
}
