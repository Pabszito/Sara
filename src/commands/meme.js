const Discord = require('discord.js')
const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args) => {

    let {body} = await snekfetch
        .get('https://meme-api.herokuapp.com/gimme')
        .query({limit: 800});

    let embed = new Discord.RichEmbed()
        .setTitle(`${body.title}`)
        .setURL(body.postLink)
        .setImage(body.url)
        .setColor("#EE82EE")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    message.channel.send(embed);
}

module.exports.help = {
    name: "meme"
}
