const Discord = require("discord.js");
const moment = require('moment');
const cpustat = require('cpu-stat');
const os = require('os');


module.exports.run = async (client, message, args) => {

    cpustat.usagePercent(function (error, percent, seconds) {
        if (error) {
            return console.log(error);
        }

        let {version} = require("discord.js");


        const embed = new Discord.RichEmbed()
            .setTitle("Acerca de")
            .setDescription("Aqui obtendras informacion acerca del bot.")
            .addField("Libreria:", "discord.js", true)
            .addField("Creditos:", "Yushu#4407", true)
            .addField("Version:", "2.4.0", true)
            .addField("Host:", "https://www.glitch.com", true)
            .addField("Hecho por:", "Pabszito#7790", true)
            .addField("Plataforma:", os.platform, true)
            .addField("Arquitectura:", os.arch, true)
            .addField("Servidores", client.guilds.size, true)
            .addField("Discord.js:", version, true)
            .addField("Memoria en uso:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, true)
            .addField("CPU actual:", `${os.cpus().map(i => `${i.model}`)[0]} (${percent.toFixed(2)}% en uso)`, false)
            //.addField("Uptime", hours +"hora(s) "+ mins+" minuto(s)", true)
            //.addField("Usuarios:", client.users.size, true)
            .setColor("#EE82EE")
            .setFooter('Bot desarrollado por Pabszito#7790', client.user.avatarURL);
        message.channel.send({embed});

    });
}
module.exports.help = {
    name: "about"
}