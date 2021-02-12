const Discord = require('discord.js');
      fetch = require('node-fetch');
      
module.exports = {
  name: "fox",
  category: "fun",
  description: "Replies with a random photo of a fox.",
  run: async(client, message, args, guild) => {
    await fetch("https://randomfox.ca/floof/")
        .then(async(res) => {
            let json = await res.json();
            let embed = new Discord.MessageEmbed()
                .setTitle("Fox")
                .setDescription(`:package: Here's what you asked for.`)
                .setImage(json.image)
                .setColor(client.config.color)
                .setFooter(`Bot developed by ${client.config.owner_tag}`, client.user.displayAvatarURL());
    
            message.channel.send(embed);
        })
  }
};