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
            "🛠 : Comandos dedicados a los desarrolladores y configuraciones\n" +
            "🎵 : Comandos de musica\n" +
            "🔞 : Comandos NSFW (18+)\n" +
            "🛰 : Utilidades o otros")
        .setColor("#EE82EE")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    message.channel.send({embed}).then(async (msg) => {
        await msg.react("⛔")
        await msg.react("🍿")
        await msg.react("ℹ")
        await msg.react("🛠")
        await msg.react("🎵")
        await msg.react("🔞")
        await msg.react("🛰")

        let moderationFilter = (reaction, user) => reaction.emoji.name === '⛔' && user.id === message.author.id;
        let entertainmentFilter = (reaction, user) => reaction.emoji.name === '🍿' && user.id === message.author.id;
        let informationFilter = (reaction, user) => reaction.emoji.name === 'ℹ' && user.id === message.author.id;
        let devFilter = (reaction, user) => reaction.emoji.name === '🛠' && user.id === message.author.id;
        let musicFilter = (reaction, user) => reaction.emoji.name === '🎵' && user.id === message.author.id;
        let nsfwFilter = (reaction, user) => reaction.emoji.name === '🔞' && user.id === message.author.id;
        let utilFilter = (reaction, user) => reaction.emoji.name === '🛰' && user.id === message.author.id;

        let moderation = msg.createReactionCollector(moderationFilter, {time: 60000});
        let entertainment = msg.createReactionCollector(entertainmentFilter, {time: 60000});
        let info = msg.createReactionCollector(informationFilter, {time: 60000});
        let dev = msg.createReactionCollector(devFilter, {time: 60000});
        let music = msg.createReactionCollector(musicFilter, {time: 60000});
        let nsfw = msg.createReactionCollector(nsfwFilter, {time: 60000});
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
                    `${prefix}changelog: Lista de cambios desde la version 2.4.1`)
                .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
                .setColor("#EE82EE")
            message.channel.send(embed)
        })

        dev.on('collect', r => {
            msg.delete();
            let embed = new Discord.RichEmbed()
                .setTitle("🛠 Comandos para desarrolladores")
                .setDescription(`${prefix}hastebin <texto>: Sube un codigo a hastebin.\n` +
                    `${prefix}pastebin <texto>: Sube un codigo a pastebin.`)
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
                    `${prefix}np: Que esta sonando ahora mismo?\n`)
                .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
                .setColor("#EE82EE")
            message.channel.send(embed)
        })

        nsfw.on('collect', r => {
            msg.delete();
            if (message.channel.nsfw === true) {
                let embed = new Discord.RichEmbed()
                    .setTitle("🔞 Comandos NSFW")
                    .setDescription(`${prefix}neko: Imagen neko aleatoria\n` +
                        `${prefix}hentai: Imagen hentai aleatoria\n` +
                        `${prefix}hpussy: Imagen hentai aleatoria (pussy)\n` +
                        `${prefix}boobs: Imagen de boobs aleatoria\n` +
                        `${prefix}ass: Imagen de ass aleatoria\n` +
                        `${prefix}4k: Imagen 4k aleatoria\n` +
                        `${prefix}anal: Imagen anal aleatoria\n` +
                        `${prefix}thigh: Imagen thigh aleatoria\n` +
                        `${prefix}yuri: Imagen yuri aleatoria.`)
                    .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
                    .setColor("#EE82EE")
                message.channel.send(embed)
            } else {
                let embed = new Discord.RichEmbed()
                    .setTitle("🔞 Comandos NSFW")
                    .setDescription("Este menu de ayuda solo es visible en los canales NSFW (Not safe/situable for work).")
                    .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
                    .setColor("#EE82EE")
                message.channel.send(embed)
            }
        })

        util.on('collect', r => {
            msg.delete();
            let embed = new Discord.RichEmbed()
                .setTitle("🛰 Utilidades")
                .setDescription(`${prefix}morse <texto>: Traduce un texto a codigo morse.\n` +
                    `${prefix}prefix [prefix]: Establece el prefix del servidor o muestra el prefix actual.\n` +
                    `${prefix}say <texto>: Haz que Sara diga algo.\n` +
                    `${prefix}weather <ciudad>: Muestra el clima de una ciudad.`)
                .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)
                .setColor("#EE82EE")
            message.channel.send(embed)
        })
    })
}

module.exports.help = {
    name: 'help'
}
