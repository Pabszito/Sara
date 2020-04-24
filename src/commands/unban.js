const utils = require('../utils.json');

module.exports.run = async (client, message, args) => {

    let unbanned = args[0];
    let member = await client.users.fetch(unbanned)
    let ban = await message.guild.fetchBans()

    if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.channel.send(`${utils.error} No puedo desbanear al usuario especificado.`);
    if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(`${utils.error} No tienes permisos para ejecutar ese comando.`);
    if (!ban.get(member.id)) return message.channel.send(`${utils.error} El usuario no esta baneado.`)

    let user = ban.get(member.id)
    message.guild.members.unban(member);

    message.channel.send(`${utils.info} ${user.user.tag} fue desbaneado del Discord.`)
};

module.exports.help = {
    name: "unban"
}