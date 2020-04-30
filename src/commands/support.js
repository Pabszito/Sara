const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let embed = new Discord.RichEmbed()
        .setTitle("Soporte")
        .setDescription("Necesitas ayuda? No te preocupes, puedes contactarnos en nuestro [Discord](https://discord.gg/BhUvv5a). Si encontraste un bug, puedes reportarlo en el apartado de [issues en GitHub](https://github.com/Pabszito/Sara/issues). **En caso de que sea un bug de seguridad, NO reportarlo en el discord de soporte ni en GitHub, por favor contacta a Pabszito#7777**")
        .setColor("#EE82EE")
        .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL);

    message.channel.send(embed);
}