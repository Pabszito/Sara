const Discord = require('discord.js');

module.exports = {
  name: "ping",
  category: "misc",
  description: "Replies with \"sock\".",
  run: async(client, message, args, guild) => {
      let embed = new Discord.MessageEmbed()
        .setTitle("Ping")
        .setDescription(`📡 Ping is around \`${client.ws.ping} ms\`.`)
        .setColor(client.config.color)
        .setFooter(`Bot developed by ${client.config.owner_tag}`, client.user.displayAvatarURL());

      message.channel.send(embed);
  }
};