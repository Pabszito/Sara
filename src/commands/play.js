const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const keys = require('../storage/botconfig.json')
const utils = require('../utils.json');
const youtube = new YouTube(keys.googleapikey); // googleapikey
const queue = new Map();

module.exports.run = async(client, msg, args) => {
    if(!args[0]) return msg.channel.send(`${utils.error} Debes especificar una cancion o video!`);
    const searchString = args.slice(1).join(' ');
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.channel.send(`${utils.error} Debes estar en un canal de voz para que yo pueda reproducir musica!`);
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has('CONNECT')) {
        return msg.channel.send(`${utils.error} No me pude conectar a tu canal de voz. Por favor comprueba que tenga los permisos adecuados.`);
    }
    if (!permissions.has('SPEAK')) {
        return msg.channel.send(`${utils.error} No puedo hablar en este canal de voz. Por favor comprueba que tenga los permisos adecuados.`);
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        let playlist = await youtube.getPlaylist(url);
        let videos = await playlist.getVideos();
        for (let video of Object.values(videos)) {
            let video2 = await youtube.getVideoByID(video.id);
            await handleVideo(video2, msg, voiceChannel, true);
        }
        return msg.channel.send(`${utils.info} Se añadio la playlist ${playlist.title} a la cola!`);
    } else {
        try {
            var video = await youtube.getVideo(url);
        } catch (error) {
            try {
                var videos = await youtube.searchVideos(searchString, 10);
                let index = 0;
                let embed = new Discord.RichEmbed()
                    .setTitle("Selecciona un video")
                    .setDescription("Por favor proporciona un valor para seleccionar uno de los resultados de la busqueda de 1 a 10.")

                msg.channel.send(`**Selecciona una cancion o video**
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Por favor proporciona un valor para seleccionar uno de los resultados de la busqueda de 1 a 10.
                `);
                try {
                    var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                } catch (err) {
                    console.error(err);
                    return msg.channel.send(`${utils.error} No se obtuvo una respuesta valida.`);
                }
                let videoIndex = parseInt(response.first().content);
                var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                console.error(err);
                return msg.channel.send('');
            }
        }
        return handleVideo(video, msg, voiceChannel);
    }
}

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    let serverQueue = queue.get(msg.guild.id);
    console.log(video);
    let song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`${utils.error} Ocurrio un error, por lo que no pude conectarme al canal de voz: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`${utils.error} Ocurrio un error, por lo que no pude conectarme al canal de voz.\nDetalles: ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else return msg.channel.send(`${utils.info} Se añadio ${song.title} a la cola!`);
    }
    return undefined;
}

function play(guild, song) {
    let serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);

    let dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.'){
                console.log('La cancion se ha terminado: '+reason);
            }
            else console.log('Cancion terminada: '+reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    let embed = new Discord.RichEmbed()
        .setTitle("Reproductor")
        .setDescription(`Comenzando a reproducir la cancion ${song.title}!`)
        .setColor("#EE82EE")
        .setFooter('Bot desarrollado por Pabszito#7777', client.user.avatarURL);
    serverQueue.textChannel.send({embed});
}

module.exports.queue = queue;

module.exports.help = {
    name: 'play'
}