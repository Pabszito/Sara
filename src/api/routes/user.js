const express = require('express');
const router = express.Router();
const user = require('../../schema/user');

module.exports = function() {

    router.get('/user/:guildId/:userId', function(req, res) {
        user.findOne({
            guildId: req.params.guildId,
            userId: req.params.userId
        }, async(err, databaseResponse) => {
            if(err) {
                console.warn("[WARN] An internal server error occurred.");
                return res.status(500).send({"code": 500, "details": "Internal server error"});
            }

            if(!databaseResponse) {
                return res.status(404).send({"code": 404, "details": "User not found"});
            }

            let json = databaseResponse.toJSON();

            delete json.__v;
            delete json._id;

            return res.status(200).send(json);
        });
    });

    return router;
};