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
            if(!serverQueue) { return 1 } else { return serverQueue.songs.length + 1 }
        }
    }
}
module.exports.MusicHandler = MusicHandler;


