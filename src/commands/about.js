const Discord = require("discord.js");
const cpustat = require('cpu-stat');
const os = require('os');

module.exports.run = async (client, message, args) => {

    cpustat.usagePercent(function (error, percent, seconds) {

        if (error) return console.log(error);

        let {version} = require("discord.js");
        let embed = new Discord.RichEmbed()
            .setTitle("Acerca de Sara")
            .addField("Libreria:", "discord.js", true)
            .addField("Version:", "2.4.1", true)
            .addField("Host:", "Glitch", true)
            .addField("Hecho por:", "Pabszito#7777", true)
            .addField("Plataforma:", os.platform, true)
            .addField("Arquitectura:", os.arch, true)
            .addField("Servidores:", client.guilds.size, true)
            .addField("Discord.js:", version, true)
            .addField("Memoria en uso:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, true)
            .addField("CPU actual:", `${os.cpus().map(i => `${i.model}`)[0]} (${percent.toFixed(2)}% en uso)`, false)
            .setColor("#EE82EE")
            .setFooter('Bot desarrollado por Pabszito#7777', client.user.avatarURL);

        message.channel.send(embed);
    });
}

module.exports.help = {
    name: "about"
}
