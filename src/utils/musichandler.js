const YouTube = require('simple-youtube-api');
const config = require('../storage/botconfig.json');
const youtube = new YouTube(config.youtubeapi);
const ytdl = require('ytdl-core');
const Discord = require("discord.js");
var queue = new Map();

class MusicHandler{

    async handleVideo(video, message, voiceChannel, playlist = false){

        if(!voiceChannel) return null;

        if(video.durationSeconds > 10800) return message.channel.send(":x: **Cannot play a song that's longer than 3 hours**")

        let serverQueue = queue.get(message.guild.id);

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
                message.channel.send(`**Playing** :notes: \`${song.title}\``)
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0], message);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                queue.delete(message.guild.id);
                return message.channel.send(`I could not join the voice channel`);
            }
        } else {
            serverQueue.songs.push(song);
            return playlist ? message.channel.send(`Added to the queue: \`${song.title}`) : null;
        }
        return null;
    }

    async play(guild, song, message) {
        let serverQueue = queue.get(guild.id);
        if (!serverQueue) return null;
        if (!song) {
            serverQueue.voiceChannel.leave()
            queue.delete(message.guild.id)
        } else {
            let dispatcher = serverQueue.connection.play(ytdl(song.url))
                .on('end', async () => {
                    if (serverQueue.loop) {
                        let lastSong = serverQueue.songs.shift();
                        serverQueue.songs.push(lastSong);
                        play(guild, serverQueue.songs[0], message);
                    } else {
                        serverQueue.songs.forEach(song => {
                            song.number = song.number - 1
                        })
                        serverQueue.songs.shift();
                        play(guild, serverQueue.songs[0], message)
                    }})
                .on('error', error => {
                    message.channel.send(":x: I have encountered an error trying to play the requested song, make sure the video isn't copyright striked and it isn't private.")
                    dispatcher.end()
                    console.error(error)
                });
            dispatcher.setVolume(serverQueue.volume / 100);
        }
    }
}
module.exports.MusicHandler = MusicHandler;


