const Discord = require('discord.js');
      fetch = require('node-fetch');
      
module.exports = {
  name: "food",
  category: "fun",
  description: "Replies with random photos of food dishes.",
  run: async(client, message, args, guild) => {
    await fetch("https://foodish-api.herokuapp.com/api/")
        .then(async(res) => {
            let json = await res.json();
            let embed = new Discord.MessageEmbed()
                .setTitle("Food")
                .setDescription(`:hamburger: Here's what you asked for.`)
                .setImage(json.image)
                .setColor(client.config.color)
                .setFooter(`Bot developed by ${client.config.owner_tag}`, client.user.displayAvatarURL());
    
            message.channel.send(embed);
        })
  }
};