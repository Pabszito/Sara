const fetch = require('node-fetch');
      jimp = require('jimp');

module.exports = {
    name: "bonzi",
    category: "fun",
    description: "Bonzi is typing...",
    run: async(client, message, args, guild) => {
        return;
        // when supreme-octo-succotash but bug
        if(!args[0]) return message.channel.send(":warning: You must specify a message.")

        message.channel.send(":white_check_mark: Processing..").then(async(m) => {
            message.channel.startTyping();

            let text = args.join(" ")
            let bonzi = await jimp.read('./assets/bonzi.png');
            let blank = await jimp.read('./assets/blank.png');

            let font = await jimp.loadFont(jimp.FONT_SANS_16_BLACK);

            blank.resize(175, 113);
            let fact = blank.print(font, 0, 0, text, 175);

            bonzi.composite(fact, 23, 12);
            bonzi.getBuffer(jimp.MIME_PNG, async(err, buffer) => {
                if(err) return console.error(err);
                await m.delete();
                await message.channel.stopTyping()
                await message.channel.send({
                    files: [{
                        name: 'bonzi.png',
                        attachment: buffer
                    }]
                })
            })

            return;
        })
    }
};