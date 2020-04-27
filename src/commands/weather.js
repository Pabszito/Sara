const Discord = require('discord.js')
const weather = require('weather-js')
const utils = require('../utils/utilities.json');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send(`${utils.error} Necesitas especificar un lugar!`);

    weather.find({search: args.join(" "), degreeType: "C"}, function (err, result) {
        if (err) message.channel.send(err)

        if (result.length === 0) {
            message.channel.send(`${utils.error} No se pudo encontrar ningun lugar con ese nombre.`)
            return;
        }

        let current = result[0].current
        let location = result[0].location

        let embed = new Discord.RichEmbed()
            .setTitle(`Clima para ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setDescription(`Aqui tienes el clima de hoy!`)
            .addField("Zona horaria", `UTC${location.timezone}`, true) //Shows the timezone
            .addField("Temperatura", `${current.temperature}°C`, true)
            .addField("Sensacion termica", `${current.feelslike} grados`, true)
            .addField("Viento", current.winddisplay, true)
            .addField("Humedad", ` ${current.humidity}%`, true)
            .addField("Dia", `${current.day}`, true)
            .addField("Fecha", `${current.date}`, true)
            .setColor("#ee82ee")
            .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

        message.channel.send(embed)
    });
}

module.exports.help = {
    name: 'weather'
}
