const Discord = require('discord.js');
      fetch = require('node-fetch');
      
module.exports = {
  name: "dog",
  category: "fun",
  description: "Replies with a random photo of a dog.",
  run: async(client, message, args, guild) => {
    await fetch("https://random.dog/woof.json")
        .then(async(res) => {
            let json = await res.json();
            let embed = new Discord.MessageEmbed()
                .setTitle("Dog")
                .setDescription(`:package: Here's what you asked for.`)
                .setImage(json.url)
                .setColor(client.config.color)
                .setFooter(`Bot developed by ${client.config.owner_tag}`, client.user.displayAvatarURL());
    
            message.channel.send(embed);
        })
  }
};