const { songModel } = require("../models");
const fs = require("fs-extra")

const songController = {
    getAllSongs: async (req, res) => {
        try {
            const song = await songModel
                .find({ _id: -1 })
                .populate("albums")
                .lean()
                .exec();

            if (!song) {
                res.status(404).send({
                    status: false,
                    msg: "We don't find"
                })
            }

            res.status(200).send({
                status: true,
                msg: "We find songs",
                data: song
            })
        } catch (err) {
            res.status(500).send({
                status: false,
                msg: err
            })
        }
    },
    postSong: async (req, res) => {
        const { body, files } = req;

        try {
            const song = await songModel
                .create({
                    ...body,
                });

            res.status(200).send({
                status: true,
                msg: "Song sucessfully created",
                data: song
            });
        } catch (err) {
            res.status(503).send({
                status: false,
                msg: "Error",
                data: err
            });
        }
    },
    consoleSong: async (next) => {
        console.log("console song")

        next();
    }
}

module.exports = {songController};