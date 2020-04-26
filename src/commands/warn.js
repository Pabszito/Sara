const Discord = require('discord.js');
const utils = require('../utils.json');

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission("KICK_MEMBERS")) {
        let target = message.mentions.users.first();
        let reason = args.slice(1).join(' ');

        if (message.author === target) return message.channel.send(`${utils.error} No te puedes advertir a ti mismo!`);
        if (!target) return message.channel.send(`${utils.error} Menciona a alguien.`);
        if (!reason) return message.channel.send(`${utils.error} Por favor, especifica una razon.`);
        if (!message.guild.member(target).kickable) return message.channel.send(`${utils.error} No puedo advertir al usuario mencionado.`);

        try {
            target.send("**Fuiste advertido!**\n" +
                `Staff: ${message.author}\n` +
                `Razon: ${reason} \n` +
                `Servidor: ${message.guild.name}`);
        }catch(error){
            console.error(error);
        }

        let embed = new Discord.RichEmbed()
            .setTitle("Usuario advertido")
            .setDescription('Lean reglas...')
            .addField("Staff:", message.author.tag, false)
            .addField("Usuario:", target.tag, false)
            .addField("Razon:", reason, false)
            .setColor("#EE82EE")
            .setFooter('Bot desarrollado por Pabszito#7777', client.user.avatarURL);
        message.channel.send(embed);
    } else {
        message.channel.send(`${utils.error} No tienes permisos para ejecutar ese comando.`);
    }
}

module.exports.help = {
    name: "warn"
}
