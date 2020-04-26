const Discord = require('discord.js');
const utils = require('../utils.json');

module.exports.run = async (client, message, args) => {

    if (!args[0]) return message.channel.send(`${utils.error} Debes hacer una pregunta.`);

    let responses = ["En mi opinión, sí", "Es cierto", "Es decididamente así", "Probablemente", "Buen pronóstico", "Todo apunta a que sí", "Sin duda", "Sí", "Definitivamente", "Debes confiar en ello", "Respuesta vaga, vuelve a intentarlo", "Pregunta en otro momento", "Será mejor que no te lo diga ahora", "No puedo predecirlo ahora", "Concéntrate y vuelve a preguntar", "Puede ser", "No cuentes con ello", "Mi respuesta es no", "Mis fuentes me dicen que no", "Las perspectivas no son buenas", "Muy dudoso", "Sabes? 9 de 10 odontologos recomiendan que te calles..."];
    let result = Math.floor((Math.random() * responses.length));

    let embed = new Discord.RichEmbed()
        .setTitle("🎱 8ball")
        .setDescription(`Mi respuesta es ${responses[result]}`)
        .setColor("#EE82EE")
        .setFooter('Bot desarrollado por Pabszito#7777', client.user.avatarURL);

    message.channel.send(embed);
}

module.exports.help = {
    name: '8ball'
}
