const express = require('express');

async function start(port) {
    const app = express();

    const guild = require('./routes/guild');
    const user = require('./routes/user');

    app.use('/api', guild());
    app.use('/api', user());

    app.listen(port, err => {
        if(err) {
            console.error(`[ERROR] An unexpected error occurred and the API was unable to start.`)
            return process.exit(1);
        }
    });
}

module.exports = {
    start
};