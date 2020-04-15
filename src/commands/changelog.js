const Discord = require('discord.js');

module.exports.run = async(client, message, args) =>{

    let embed = new Discord.RichEmbed()
    .setTitle("Lista de cambios")
    .setDescription("La lista de cambios fue implementada en la version 2.4.1 por lo que se mostraran los cambios a partir de esa version.")
    .addField("2.4.1", "- Se optimizo el codigo de Sara.\n- Se añadio el comando changelog\n- Se añadieron de nuevo los comandos de musica.\n"+
    "- Se eliminaron algunos comandos innecesarios.\n- Se mejoraron algunos comandos como kiss, hug, triggered y pat.\n- El comando hastebin ya no mostrara un mensaje diciendo que no se pudo subir lo especificado.\n"+
    "- Se elimino el comando teamtrees\n- Se actualizo el tag de Pabszito#7790 a Pabszito#7777.\n- Ya no se resetearan los prefixes cada vez que sale una nueva actualizacion.\n- Añadido el comando s!unban, arreglado el s!ban y el s!kick.\n- Entre muchos otros cambios internos")
    .setColor("#EE82EE")
    .addField("Errores?", "Has encontrado un error? Recuerda que puedes reportarlo [aqui](https://github.com/Pabszito/Sara/issues)! Tambien puedes ayudarnos a solucionarlo haciendo un [pull request](https://github.com/Pabszito/Sara/pulls) en el repo de GitHub.")
    .setFooter("Bot desarrollado por Pabszito#7777", client.user.avatarURL)

    message.channel.send(embed);
}

module.exports.help = {
    name: 'changelog'
}
