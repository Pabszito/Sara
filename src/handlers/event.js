const {readdirSync} = require('fs');

module.exports = (client) => {
    const load = async(dirs) => {
        const events = readdirSync(`./src/events/${dirs}/`).filter((d) => d.endsWith(".js"));
        for(let file of events) {
            const eventFile = require(`../events/${dirs}/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, eventFile.bind(null, client));
        }
    };
    ["client", "guild"].forEach((x) => load(x));
};
