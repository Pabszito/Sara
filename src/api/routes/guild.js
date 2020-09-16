const express = require('express');
const router = express.Router();
const guild = require('../../schema/guild');

module.exports = function() {

    router.get('/guild/:guildId', function(req, res) {
        guild.findOne({
            id: req.params.guildId
        }, async(err, databaseResponse) => {
            if(err) {
                console.warn("[WARN] An internal server error occurred.");
                return res.status(500).send({"code": 500, "details": "Internal server error"});
            }

            if(!databaseResponse) {
                return res.status(404).send({"code": 404, "details": "Guild not found"});
            }

            let json = databaseResponse.toJSON();

            delete json.__v;
            delete json._id;

            return res.status(200).send(json);
        });
    });

    return router;
};