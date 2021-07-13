const Discord = require('discord.js');
const config = require('../../config.json');
const osu = require('node-osu');
const osuApi = new osu.Api(config.osu_api, {
	notFoundAsError: false,
	completeScores: true,
	parseNumeric: true
});

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m + (m == 1 ? " minute " : " minutes ");
    return hDisplay + mDisplay; 
}

module.exports = {
    name: "osu",
    category: "info",
    description: "Get your osu! profile information.",
    run: async(client, message, args, guild) => {
        if(!args[0]) return message.channel.send(":x: Please specify a username! (Bancho only)");
        
        osuApi.getUser({ u: args[0] }).then(user => {
            if(!user) return message.channel.send(":x: User not found.");

            let embed = new Discord.MessageEmbed()
                .setTitle("osu!")
                .setDescription(`${args[0]} on the osu! Bancho server.`)
                .addField("Global Ranking", `#${user.pp.rank}`, true)
                .addField("Country Ranking", `#${user.pp.countryRank}`, true)
                .addField("Performance Points", `${Math.round(user.pp.raw)} pp`, true)
                .addField("Country", `${user.country} (:flag_${user.country.toLowerCase()}:)`, true)
                .addField("Accuracy", `${user.accuracyFormatted}`, true)
                .addField("Time played", `${secondsToHms(user.secondsPlayed)}`, true)
                .addField("Play count", `${user.counts.plays} plays`, true)
                .addField("Silver SS", user.counts.SSH, true)
                .addField("SS", user.counts.SS, true)
                .addField("Silver S", user.counts.S, true)
                .addField("A ranks", user.counts.A, true)
                .setColor(client.config.color)
                .setFooter(`Bot developed by ${client.config.owner_tag}`, client.user.displayAvatarURL());
            
            message.channel.send(embed);
        });
        
        
  
        
    }
  };
