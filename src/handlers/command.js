const {readdirSync} = require("fs");

module.exports  = (client) => {
    readdirSync("./src/commands/").forEach(async(dir) => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                console.info(`[INFO] Successfully loaded command ${file}`);
            } else {
                console.error(`[ERROR] An exception occurred while loading command ${file}.`);
                continue;
            } if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
        }
    });
    console.info("[INFO] Finished loading commands.");
};
