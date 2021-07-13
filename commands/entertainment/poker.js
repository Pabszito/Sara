const Discord = require('discord.js');
      config = require("../../config.json");
      
module.exports = {
  name: "poker",
  category: "entertainment",
  description: "Allows you to play Poker Night in a voice channel.",
  run: async(client, message, args, guild) => {

    if(!args[0]) return message.channel.send(":x: You must provide an ID to the channel where you want to play Poker Night! " 
                    + "(enable developer mode in settings, right click the channel and copy ID)");

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

    if(!channel || channel.type !== "voice") {
        return message.channel.send(":x: You must provide a valid voice channel!");
    }

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 7200,
            max_uses: 0,
            target_application_id: config.poker_night,
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(invite => {
        if(invite.error || !invite.code) {
            if(invite.error) console.error("[ERROR] An internal error occurred: " + invite.error);
            message.channel.send(`:x: An internal error has ocurred. Please try again later. (INVITE_CODE_EMPTY)`);
            return;
        }

        if(invite.code == 50013) {
            let embed = new Discord.MessageEmbed()
            .setTitle("Poker Night")
            .setDescription("I don't have enough permissions to create an invite.")
            .setColor(client.config.color)
            .setFooter(`Bot developed by ${client.config.owner_tag}`, client.user.displayAvatarURL());
            
            return message.channel.send(embed);
        }

        let embed = new Discord.MessageEmbed()
            .setTitle("Poker Night")
            .setDescription(`Click [here](https://discord.gg/${invite.code}) to start playing Poker Night.\nTo invite a friend, use the following invite: https://discord.gg/${invite.code}`)
            .setColor(client.config.color)
            .setFooter(`Bot developed by ${client.config.owner_tag}`, client.user.displayAvatarURL());

        message.channel.send(embed);
    })
    .catch(() => {
        message.channel.send(":x: An internal error has occurred. Please try again later. (FETCH_ERROR)");
    });
  }
};