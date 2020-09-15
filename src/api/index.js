"use strict";

const express = require('express');

async function start(port) {
    const app = express();

    const guild = require('./routes/guild');

    app.use('/api', guild());

    app.listen(port, err => {
        if(err) {
            console.error(`[ERROR] An unexpected error occurred and the backend was unable to start.`)
            return process.exit(1);
        }
    });
}

module.exports = {
    start
};