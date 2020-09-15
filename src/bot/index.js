const Discord = require('discord.js');
const client = new Discord.Client({
    disableMentions: "everyone"
});

const fetch = require('node-fetch');

client.on('message', async(message) => {
    if(message.author.id !== "447902653842980875") return;
    if(message.content.startsWith("s!test")) {
        await fetch('http://localhost/api/guild/1')
            .then((res) => {
                message.channel.send(`Server response: ${res.status}`)
                return res.json();
            })
            .then((json) => console.log(json));
    }
});

async function start(token) {
    client.login(token).then(() => console.info(`[INFO] Logged in as ${client.user.tag}!`));
}

module.exports = {
    start
};