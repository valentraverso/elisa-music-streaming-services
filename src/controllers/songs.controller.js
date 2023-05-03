const { songModel, albumModel } = require("../models");
const fs = require("fs-extra")

const songController = {
    getAllSongs: async (req, res) => {
        try {
            const song = await songModel
                .find({})
                .populate("album");


            if (!song) {
                res.status(404).send({
                    status: false,
                    msg: "We couldn't find songs"
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
                msg: "We have problems while fetching the data",
                data: err
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

            const updateAlbum = await albumModel.findByIdAndUpdate(
                { _id: body.album },
                { "$push": { songs: song._id } },
                { new: true }
            )

            console.log(updateAlbum)

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
    updateSong: async (req, res, next) => {
        const { body: bodyRequest, params: { idSong } } = req;

        if ('album' in bodyRequest) {
            res.status(409).send({
                status: false,
                msg: "You couldn't modify the album of the song"
            })
            return;
        }

        try {
            const song = await songModel
                .findOneAndUpdate(
                    {
                        _id: idSong,
                        owner: bodyRequest.idOwner
                    },
                    {
                        ...bodyRequest
                    }
                );

            res.status(200).send({
                status: true,
                msg: "Song successfully updated",
                data: song
            })
        } catch (err) {
            res.status(500).send({
                status: false,
                msg: "We have problems while updating the data",
                data: err.message
            })
        }
    },
    deleteSong: async (req, res, next) => {

    }
}

module.exports = { songController };