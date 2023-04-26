const { songModel } = require("../models");

const songController = {
    getAllSongs: async (req, res) => {
        try {
            const song = await songModel
                .find({ _id: -1 })
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
        const { body } = req;

        try {
            const song = await songModel
                .create({
                    ...body
                });

            res.status(200).send({
                status: true,
                msg: "Song sucessfully created",
                data: song
            });
        } catch (err) {

        }
    }
}

