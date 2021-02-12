const Discord = require('discord.js');
      fetch = require('node-fetch');
      
module.exports = {
  name: "cat",
  category: "fun",
  description: "Replies with a random photo of a cat.",
  run: async(client, message, args, guild) => {
    await fetch("https://aws.random.cat/meow")
        .then(async(res) => {
            let json = await res.json();
            let embed = new Discord.MessageEmbed()
                .setTitle("Cat")
                .setDescription(`:package: Here's what you asked for.`)
                .setImage(json.file)
                .setColor(client.config.color)
                .setFooter(`Bot developed by ${client.config.owner_tag}`, client.user.displayAvatarURL());
    
            message.channel.send(embed);
        })
  }
};