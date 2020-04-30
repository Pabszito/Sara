const utils = require('../utils/utilities.json');

module.exports.run = async(client, message, args) => {

    let toSay = args.join(" ");

    if(!args[0]) return message.channel.send(`${utils.error} Necesitas darme un texto!`);

    toSay.replace("@everyone", "@/everyone");
    toSay.replace("@here", "@/here");

    message.channel.send(toSay);
}

module.exports.help ={
    name: 'say'
}