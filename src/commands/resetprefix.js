const utils = require('../utils/utilities.json');
const prefixes = require('../storage/prefix.json');
const path = require('path');

module.exports.run = async(client, message, args) =>{

    let prefix = "s!";
    if (prefixes.hasOwnProperty("g" + message.guild.id)) {
        prefix = prefixes["g" + message.guild.id];
    }

    if(prefix === "s!") message.channel.send(`${utils.warning} La configuracion actual del prefix es la que viene por defecto!`);
    message.channel.send(`${utils.refresh} Se esta actualizando la configuracion, por favor espera...`);

    delete prefixes["g" + message.guild.id];

    message.channel.send(`${utils.info} Se reseteo la configuracion del prefix para este servidor.`)
}

module.exports.help = {
    name: 'resetprefix'
}