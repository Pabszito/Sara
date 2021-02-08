module.exports = async (client,message) => {
    let prefix = client.config.prefix;

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = client.commands.get(command.slice(prefix.length));

    if (!cmd) return;
    if (cmd) cmd.run(client, message, args);
}