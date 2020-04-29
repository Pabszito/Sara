const YouTube = require('simple-youtube-api');
const config = require('../storage/botconfig.json');
const youtube = new YouTube(config.googleapikey);
const ytdl = require('ytdl-core');
const Discord = require("discord.js");
const queue = new Map();
const utils = require('../utils/utilities.json');

async function handleVideo(video, message, voiceChannel, playlist = false) {

    if (!voiceChannel) return null;

    if (video.durationSeconds > 10800) return message.channel.send(`${utils.error} No puedo reproducir una cancion que dura mas de 3 horas.`)

    const serverQueue = queue.get(message.guild.id);

    function number() {
        return !serverQueue ? 1 : serverQueue.songs.length + 1;
    }

    let song = {
        number: serverQueue ? serverQueue.songs.length : 0,
        id: video.id,
        title: Discord.Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        requester: message.author.username,
        duration: video.durationSeconds
    };

    if (!serverQueue) {
        let queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true,
            loop: false
        };
        queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        try {
            message.channel.send(`${utils.info} Reproduciendo \`${song.title}\`...`)
            queueConstruct.connection = await voiceChannel.join();
            await play(message.guild, queueConstruct.songs[0], message);
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(`${utils.error} ${error}`);
        }
    } else {
        serverQueue.songs.push(song);
        return playlist ? message.channel.send(`${utils.info} Se añadio \`${song.title}\` a la cola!`) : null;
    }
    return null;
}

async function play(guild, song, msg) {
    const serverQueue = queue.get(guild.id);
    if (!serverQueue) return null;
    if (!song) {
        serverQueue.voiceChannel.leave()
        queue.delete(msg.guild.id)
    } else {
        const dispatcher = connection.playStream(ytdl(song.url))
            .on('end', async () => {
                if (serverQueue.loop) {
                    let lastSong = serverQueue.songs.shift();
                    serverQueue.songs.push(lastSong);
                    await play(guild, serverQueue.songs[0], msg);
                } else {
                    serverQueue.songs.forEach(song => {
                        song.number = song.number - 1
                    })
                    serverQueue.songs.shift();
                    await play(guild, serverQueue.songs[0], msg)
                }})
            .on('error', error => {
                msg.channel.send(":x: I have encountered an error trying to play the requested song, make sure the video isn't copyright striked and it isn't private.")
                dispatcher.end()
                console.error(error)
            });
        dispatcher.setVolume(serverQueue.volume / 100);
    }
}
exports.modules = {
    youtube : youtube,
    ytdl : ytdl,
    queue : queue,
    handleVideo : handleVideo,
    play : play
}


