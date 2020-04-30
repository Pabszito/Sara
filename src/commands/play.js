const utils = require('../utils/utilities.json');
const handler = require('../utils/musichandler').modules;

module.exports.run = async(client, message, args) => {

  let voiceChannel = message.member.voiceChannel;

  if (!voiceChannel) {
      return message.channel.send(`${utils.error} Necesitas estar en un canal de voz para hacer eso!`)
  }

  let url = args.join(" ");
  message.channel.send(`${utils.info} Buscando \`${url}\`...`)
  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
    let playlist = await handler.youtube.getPlaylist(url);
    let videos = await playlist.getVideos();
    for (const video of Object.values(videos)) {
      let video2 = await handler.youtube.getVideoByID(video.id).catch(err => {
        if(err == "Error: resource youtube#videoListResponse not found") return;
      })
      if(video2 == null) continue
      await handler.handleVideo(video2, message, voiceChannel, true);
    }
    return message.channel.send(`${utils.info} Añadiendo la playlist \`${playlist.title}\` a la cola de canciones.`)
  } else {
    try {
      var video = await handler.youtube.getVideo(url);
    } catch (error) {
      try {
        let videos = await handler.youtube.searchVideos(url, 1);
        var video = await handler.youtube.getVideoByID(videos[0].id);
      } catch (err) {
        console.error(err);
      }
    }
    return handler.handleVideo(video, message, voiceChannel).catch(err => {
        message.channel.send(`${utils.error} No se encontraron resultados.`);
    })
  }
}

module.exports.help = {
    name: 'play'
}