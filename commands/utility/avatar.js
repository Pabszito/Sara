const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    category: "utility",
    description: "Gets the avatar of an specified person.",
    run: async(client, message, args, guild) => {
        let target = message.mentions.members.first() || await message.guild.members.fetch(args[0] ? args[0] : message.author.id); // soy buenisimo vfdhsjgfkdl,b
        
        let embed = new Discord.MessageEmbed()
          .setTitle("Avatar")
          .setDescription(`:inbox_tray: Here's what you asked for.`)
          .setColor(client.config.color)
          .setImage(target.user.displayAvatarURL({size: 1024}))
          .setFooter(`Bot developed by ${client.config.owner_tag}`, client.user.displayAvatarURL());
  
        message.channel.send(embed);
    }
  };