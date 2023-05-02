const { songModel } = require("../models");
const fs = require("fs-extra")

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
        const { body, files } = req;

        try {
            const { public_id, secure_url } = await uploadRewardImg(files.image.tempFilePath)
            await fs.unlink(files.image.tempFilePath)

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

        }
    }
}

module.exports = {songController};