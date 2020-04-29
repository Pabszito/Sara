const Discord = require('discord.js');
const { Client, Util, RichEmbed } = require('discord.js');
const utils = require('../utils/utilities.json');
const handler = require('../utils/musichandler').modules;
const ytdl = require("ytdl-core");
const opus = require('opusscript');
const ms = require("ms");

module.exports.run = async(client, message, args) => {
  if (!message.member.voiceChannel) return message.channel.send(`${utils.error} ¡Tienes que unirte a un canal de voz!`);
  if (!args[0]) return message.channel.send(`${utils.error} ¡Tienes que agregar un link de YouTube!`);
  if (message.guild.voiceConnection) return message.channel.send(`${utils.error} ¡Ya estoy reproduciendo una canción!`);
  
  let validate = await ytdl.validateURL(args[0]);
  
  if (!validate) return message.channel.send(`${utils.error} Tienes que agregar un link de YouTube **valido**.`);
  
  let info = await ytdl.getInfo(args[0]);
  var minutes = Math.floor(info.player_response.videoDetails.lengthSeconds / 60); 
  var secs = info.player_response.videoDetails.lengthSeconds % 60;
  var hours = Math.floor(info.player_response.videoDetails.lengthSeconds / 60 / 60);
  
  if (minutes > 20) return message.channel.send(`${utils.error} ¡Ese vídeo es muy largo!`);
  if (hours > 1) return message.channel.send(`${utils.error} ¡Ese vídeo es muy largo!`);
  
  let connection = await message.member.voiceChannel.join();
  let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' }));
  let thumbnail = 'https://img.youtube.com/vi/' + info.player_response.videoDetails.videoId + '/0.jpg';
  
  let embed = new RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle(`Escuchando: ${info.title}`)
    .setThumbnail(thumbnail)
    .addField("Duración del Vídeo:", `${hours} horas, ${minutes} minutos y ${secs} segundos`, true)
    .addField(`Autor del Vídeo:`, `${info.author.name}`, true)
    .setColor("RANDOM")
    .setFooter('Bot desarrollado por Pabszito#7777', client.user.avatarURL);
  message.channel.send(embed);
  
  var minutesleft = ms(minutes + "m");
  var secondsleft = ms(secs + "s");
  var hoursleft = ms(hours + "h");
  var timeleft = secondsleft + minutesleft + hoursleft;

  setTimeout(function(){ message.guild.me.voiceChannel.leave() }, timeleft);
}

module.exports.help = {
    name: 'play'
}
