const Discord = require('discord.js');

module.exports = {
    name: "eval",
    category: "utility",
    description: "Gets the avatar of an specified person.",
    run: async(client, message, args, guild) => {
        if(message.author.id !== "447902653842980875") return;
        if(!args[0]) return message.channel.send(":x: Why don't you provide some code to evaluate? That would be fun.");

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .addField(`Input`, `\`\`\`js\n${args.join(" ")}\`\`\``)
            .addField(`Output`, `\`\`\`${eval(args.join(" "))}\`\`\``)
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL());

        message.channel.send(embed);
    }
};