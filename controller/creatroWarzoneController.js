const CreatorWarZone = require("../models/ContentCreatorWarzone");
const Comment = require("../models/creatorComment");
var cron = require("node-cron");
const moment = require("moment");

// add war
exports.addCreatorWar = async (req, res) => {
    try {
        const war = await CreatorWarZone.create(req.body);
        res.status(200).json({
            status: true,
            msg: "Creator War Created Successfully...",
            data: war,
        });
    } catch (error) {
        console.log(error, "add warzone error");
        res.status(400).json({
            status: false,
            msg: "Something Went wrong",
        });
    }
};