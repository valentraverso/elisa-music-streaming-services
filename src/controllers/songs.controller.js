const mongoose = require("mongoose");
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

        if(!mongoose.Types.ObjectId.isValid(idSong)){
            res.status(409).send({
                status: false,
                msg: "Invalid ID"
            })
            return;
        }

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
        const { body: { idOwner }, params: { idSong } } = req;

        if(!mongoose.Types.ObjectId.isValid(idSong)){
            res.status(409).send({
                status: false,
                msg: "Invalid ID"
            });
            return;
        }

        try {
            const song = await songModel
                .findOneAndDelete({
                    _id: idSong,
                    owner: idOwner
                });

                res.status(200).send({
                    status: true,
                    msg: "Song deleted successfully"
                })
        } catch (err) {
            res.status(500).send({
                status: false,
                msg: "We have a problem while deleting the song."
            })
        }
    }
}

module.exports = {songController};