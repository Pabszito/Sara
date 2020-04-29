// ADVERTENCIA DE CANCER
// Este es el peor codigo del mundo
// xfa no critiquen, lo planeo arreglar pronto

// CANCER WARNING
// This is the worst code in the world
// pls don't say anything about it, i'm planing to fix it soon

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./storage/botconfig.json");
const token = config.token; // Bot token
const fs = require("fs");
const prefixes = require('./storage/prefix.json');
const utils = require('./utils/utilities.json');
const DBL = require("dblapi.js");
const dbl = new DBL(config.topggtoken, client);

dbl.on('posted', () => {
    console.log('[INFO] Server count posted!');
});

dbl.on('error', e => {
    console.log(`[ERROR] Oops! ${e}`);
});

client.queue = new Map();
client.commands = new Discord.Collection();

fs.readdir(__dirname + "/commands", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) { // Si la cantidad de archivos es 0 o menos, responder con "return;"
        console.log("[INFO] No se encontraron comandos para cargar"); // Informar a la consola que no hay comandos para cargar
        return;
    }

    console.log(`[INFO] Cargando ${jsfiles.length} comandos!`); // Informar a la consola que se estan cargando x cantidad de comandos

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[INFO] ${f} cargado!`); // Informar a la consola que se terminaron de cargar los archivos
        client.commands.set(props.help.name, props);
    });
});


client.on('ready', async => {
    client.user.setActivity(`s!help | rel. 2.4.1`, {
        type: "STREAMING",
        url: "https://twitch.tv/pabszito"
    });
    console.log(`[INFO] Sara esta lista. Sesion iniciada como ${client.user.tag}`); // Informa en la consola que el bot esta listo
});

client.on("message", async message => {

    let prefix = "s!";

    if (message.guild && prefixes.hasOwnProperty("g" + message.guild.id)) {
        prefix = prefixes["g" + message.guild.id];
    }

    let error = new Discord.RichEmbed()
        .setTitle("Hey!")
        .setDescription("Sara aun no soporta mensajes privados! Si crees que esto es un error, puedes contactar con un desarrollador.")
        .setColor("#EE82EE")
        .setFooter('Bot desarrollado por Pabszito#7790', client.user.avatarURL);

    if (message.author.bot) return; // Si el autor del mensaje es un bot, no hacer nada
    if (message.channel.type === "dm") return message.channel.send(error); // Si el mensaje es por privado, no hacer nada

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return; // Si el comando no empieza con el prefix "s!", no hacer nada

    let log = command.substring(prefix.length);
    console.log(`[INFO] ${message.author.tag} executed command "${log}"`);

    let cmd = client.commands.get(command.slice(prefix.length)); // Obtener comando
    if (cmd) cmd.run(client, message, args); // Si el comando existe, ejecutarlo
});

client.login(token); // Inicia sesion con la token del bot.
