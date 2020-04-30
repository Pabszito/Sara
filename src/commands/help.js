const Discord = require('discord.js');
const prefixes = require('../storage/prefix.json');


module.exports.run = async (client, message, args) => {

    var prefix = "s!";

    if (prefixes.hasOwnProperty("g" + message.guild.id)) {
        prefix = prefixes["g" + message.guild.id];
    }

    let embed = new Discord.RichEmbed()
        .setTitle("Menu de ayuda")
        .setDescription("Necesitas ayuda? Reacciona a uno de los emojis para obtener ayuda sobre una categoria en especifico!\n" +
            "⛔ : Comandos de moderacion\n" +
            "🍿 : Comandos de entretenimiento\n" +
            "ℹ : Comandos de informacion\n" +
            "🎵 : Comandos de musica\n" +
            "🛰 : Utilidades o otros")
        .setColor("#EE82EE")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    message.channel.send({embed}).then(async (msg) => {
        await msg.react("⛔")
        await msg.react("🍿")
        await msg.react("ℹ")
        await msg.react("🎵")
        await msg.react("🛰")

        let moderationFilter = (reaction, user) => reaction.emoji.name === '⛔' && user.id === message.author.id;
        let entertainmentFilter = (reaction, user) => reaction.emoji.name === '🍿' && user.id === message.author.id;
        let informationFilter = (reaction, user) => reaction.emoji.name === 'ℹ' && user.id === message.author.id;
        let musicFilter = (reaction, user) => reaction.emoji.name === '🎵' && user.id === message.author.id;
        let utilFilter = (reaction, user) => reaction.emoji.name === '🛰' && user.id === message.author.id;

        let moderation = msg.createReactionCollector(moderationFilter, {time: 60000});
        let entertainment = msg.createReactionCollector(entertainmentFilter, {time: 60000});
        let info = msg.createReactionCollector(informationFilter, {time: 60000});
        let music = msg.createReactionCollector(musicFilter, {time: 60000});
        let util = msg.createReactionCollector(utilFilter, {time: 60000});

        moderation.on('collect', r => {
            msg.delete();
            let embed = new Discord.RichEmbed()
                .setTitle("⛔ Comandos de moderacion")
                .setDescription(`${prefix}warn <miembro> [razon]: Advierte a un usuario.\n` +
                    `${prefix}kick <miembro> [razon]: Expulsa a un usuario.\n` +
                    `${prefix}ban <miembro> [razon]: Banea a un usuario.\n` +
                    `${prefix}clear <cantidad>: Limpia una cierta cantidad de mensajes.`)
                .setColor("#EE82EE")
                .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
            message.channel.send(embed)
        })

        entertainment.on('collect', r => {
            msg.delete();
            let embed = new Discord.RichEmbed()
                .setTitle("🍿 Comandos de entretenimiento")
                .setDescription(`${prefix}hug <miembro>: Abraza a un usuario\n` +
                    `${prefix}pat <miembro>: Dale un poco de cariño a alguien.\n` +
                    `${prefix}kiss <miembro>: Dale un beso a alguien.\n` +
                    `${prefix}meme: Envia un meme aleatorio.\n` +
                    `${prefix}8ball <pregunta>: 8ball clasico.\n` +
                    `${prefix}triggered <miembro>: ***triggered***\n` +
                    `${prefix}gay <miembro>: Una vez cuando tenia 7 años me senté en un plátano, y claro eso cambio mi vida. <3\n` +
                    `${prefix}basura <miembro>: Wow, esto es basura!\n` +
                    `${prefix}cat: Imagen de un gato aleatorio.`)
                .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
                .setColor("#EE82EE")
            message.channel.send(embed)
        })

        info.on('collect', r => {
            msg.delete();
            let embed = new Discord.RichEmbed()
                .setTitle("ℹ Comandos de informacion")
                .setDescription(`${prefix}about: Obten informacion acerca del bot.\n` +
                    `${prefix}serverinfo: Obten informacion acerca del servidor.\n` +
                    `${prefix}ping: Obten el ping del bot.\n` +
                    `${prefix}userinfo [miembro]: Obtener informacion de un usuario.\n` +
                    `${prefix}links: Links relacionados al bot.\n` +
                    `${prefix}changelog: Lista de cambios desde la version 2.4.1\n` +
                    `${prefix}support: Encontraste un bug? Dudas? Puedes usar este comando para obtener el Discord de soporte, nuestro GitHub, y el tag del creador en caso de encontrar algun bug de seguridad.`)
                .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
                .setColor("#EE82EE")
            message.channel.send(embed)
        })

        music.on('collect', r => {
            msg.delete();
            let embed = new Discord.RichEmbed()
                .setTitle("🎵 Comandos de musica")
                .setDescription(`${prefix}play <cancion>: Reproduce una cancion\n` +
                    `${prefix}skip: Salta a la siguiente cancion en la cola.\n` +
                    `${prefix}stop: Frena el reproductor.\n` +
                    `${prefix}queue: Te dice que cancion esta a continuacion y la que esta sonando ahora mismo.\n` +
                    `${prefix}pause: Tu mama te dijo que vayas a sacar la basura? Puedes pausar la cancion para escucharla luego!\n`+
                    `${prefix}resume: Volviste? Reanuda la cancion para poder seguirla donde la dejaste!\n`+
                    `${prefix}volume [volume]: Muestra el volumen actual, o establecelo a uno distinto.`)
                .addField("Advertencia", "Los comandos de musica se encuentran bajo desarrollo aun, por lo que tienen errores a veces. No dudes en reportarlos!")
                .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
                .setColor("#EE82EE")
            message.channel.send(embed)
        })

        util.on('collect', r => {
            msg.delete();
            let embed = new Discord.RichEmbed()
                .setTitle("🛰 Utilidades")
                .setDescription(`${prefix}morse <texto>: Traduce un texto a codigo morse.\n` +
                    `${prefix}prefix [prefix]: Establece el prefix del servidor o muestra el prefix actual.\n` +
                    `${prefix}say <texto>: Haz que Sara diga algo.\n` +
                    `${prefix}weather <ciudad>: Muestra el clima de una ciudad.\n`+
                    `${prefix}pastebin <texto>: Sube codigo a pastebin!\n`+
                    `${prefix}hastebin <texto>: Sube codigo a hastebin!`)
                .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
                .setColor("#EE82EE")
            message.channel.send(embed)
        })
    })
}

module.exports.help = {
    name: 'help'
}
