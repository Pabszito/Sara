const Discord = require('discord.js');
const botconfig = require('../storage/botconfig.json');
const Weez = require('weez');
const weez = new Weez.WeezAPI(botconfig.weezkey);
const utils = require('../utils/utilities.json');

module.exports.run = async (client, message, args) => {

    let target = message.mentions.users.first();

    let pat = await weez.randomPat();
    let attachment = new Discord.Attachment(pat, 'pat.gif')

    let embed = new Discord.RichEmbed()
        .setTitle("...")
        .setColor("#EE82EE")
        .attachFile(attachment)
        .setImage(`attachment://pat.gif`)
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    if(!target){
        embed.setDescription(`Ten una palmadita de mi parte, ${message.author}`)
    }else if(target && target.id === client.user.id){
        embed.setDescription(`Aww, thx`);
    }else{
        embed.setDescription(`${target}, has recibido una palmadita por parte de ${message.author}`)
    }

    message.channel.send(embed);
}

module.exports.help = {
    name: "pat"
}
