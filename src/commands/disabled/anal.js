const Discord = require('discord.js')
const superagent = require('superagent');
const utils = require('../../utils/utilities.json');

module.exports.run = async (client, message, args) => {

    if (message.channel.nsfw === true) {
        superagent.get('https://nekobot.xyz/api/image')
            .query({type: 'anal'})
            .end((err, response) => {
                let embed = new Discord.RichEmbed()
                    .setTitle("...")
                    .setImage(response.body.message)
                    .setColor("#EE82EE")
                    .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);
                message.channel.send(embed)
                if (err) {
                    console.error(err);
                }
            });
    } else {
        message.channel.send(`${utils.error} Debes estar en un canal NSFW para utilizar ese comando!`)
    }
}

module.exports.help = {
    name: 'anal'
}
