const backend = require('./src/api');
const mongoose = require('mongoose');
const bot = require('./src/bot/index');

async function start() {
    await mongoose.connect('MONGODB-URI-GOES-HERE', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) => {
        if(err) {
            console.error(`[ERROR] Unable to connect to the Mongo database.`);
            return process.exit(1);
        }
        console.info(`[INFO] Connected to the Mongo database.`)
    });

    await backend.start(80).then(() => console.info(`[INFO] Backend running at port 80`));
    await bot.start("TOKEN-GOES-HERE");
}

start();
