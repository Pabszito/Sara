const Discord = require('discord.js');
      puppeteer = require('puppeteer');
      validurl = require('valid-url'); // there is no need to use a third party library but speedrun screenshot command wr 0.9s Ctrl-C%

const getPage = async(url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({
      width: 1920,
      height: 1080
    });

    const buffer = await page.screenshot({path: `temp/${Date.now()}.png`});

    await browser.close();
    return buffer;
}

module.exports = {
  name: "screenshot",
  category: "misc",
  description: "Takes a screenshot of a page.",
  run: async(client, message, args, guild) => {
    let url = args[0];

    let startTime = new Date();
    
    const buffer = await getPage(url).catch(err => {
       return message.channel.send(":x: Please specify a valid URL.");
    });

    let endTime = new Date();

    const timeDifference = endTime - startTime;

    const attachment = new Discord.MessageAttachment(buffer, 'screenshot.png');

    let embed = new Discord.MessageEmbed()
        .setTitle("Screenshot")
        .setDescription(`⏲️ Here's what you asked for. Took \`${timeDifference} ms\`.`)
        .attachFiles(attachment)
        .setImage("attachment://screenshot.png")      
        .setColor(client.config.color)
        .setFooter(`Bot developed by ${client.config.owner_tag}`, client.user.displayAvatarURL());

    await message.channel.send(embed);
    buffer.delete();
  }
};