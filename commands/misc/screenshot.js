const Discord = require('discord.js');
      puppeteer = require('puppeteer');
      validurl = require('valid-url'); // there is no need to use a third party library but speedrun screenshot command wr 0.9s Ctrl-C%
      fs = require('fs');
      os = require('os');

module.exports = {
  name: "screenshot",
  category: "misc",
  description: "Takes a screenshot of a page.",
  run: async(client, message, args, guild) => {
    let platform = os.platform();
    
    if(platform === "win32") {
        if(message.author.id !== "447902653842980875") {
            return message.channel.send("<:warning_:619696780602245141> This command has been disabled when running under a development environment due to security purposes.");
        }
    }

    let url = args[0];

    let startTime = new Date();
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(url).catch(async(err) => {
        return message.channel.send(":x: An internal error has occurred.");
    });

    await page.setViewport({
      width: 1920,
      height: 1080
    });

    const path = `./temp/${Date.now()}.png`;
    const buffer = await page.screenshot();

    await browser.close();

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
  }
};