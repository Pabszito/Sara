const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let embed = new Discord.RichEmbed()
    .setTitle("Donaciones")
    .setDescription("Decidiste donar al desarrollo de Sara? Enhorabuena! Actualmente aceptamos donaciones por Bitcoin, Bitcoin Cash, Litecoin y PayPal.")
    .addField("BTC", "bc1q24x2sfddjk4tufv8rd5fywc8wg7lmd0qdhtys9")
    .addField("BCH", "qz7ykkpyk5k9az5mqzr6dnf490yar8r0cgvalkdy5x")
    .addField("LTC", "LadwPyN9T9C2vJGevHpv9dKcEK9t1cwA3T")
    .addField("PayPal", "[Haz click aqui](https://paypal.me/Pabszito)")
    .setColor("#EE82EE")
    .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    message.channel.send(embed);
}  

module.exports.help = {
    name: 'donate'
}