const mongoose = require("mongoose");
const { songModel, albumModel } = require("../models");
const fs = require("fs-extra");
const uploadMultipleSongs = require("../utils/upload_multiple_songs");
const {uploadSong} = require("../utils/cloudinary");
const switchUploadSong = require("../utils/switch_upload_song");

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
    getByTitle: async (req, res, next) => {
        const { params: { songTitle } } = req;

        if (!songTitle || songTitle.length > 50) {
            res.status(409).send({
                status: false,
                msg: "The title need to have less than 50 characters"
            });
            return;
        }

        try {
            const song = await songModel
                .find({
                    "title": {
                        "$regex": songTitle,
                        "$options": "i"
                    }
                })

            if (song.length <= 0) {
                res.status(404).send({
                    status: false,
                    msg: "We couldn't find songs"
                })
                return;
            }

            res.status(200).send({
                status: true,
                msg: "We find song with this title.",
                data: song
            })
        } catch (err) {
            res.status(503).send({
                status: false,
                msg: "Error2",
                data: err.message
            });
        }
    },
    getById: async (req, res, next) => {
        const { params: { idSong } } = req

        if (!mongoose.Types.ObjectId.isValid(idSong)) {
            res.status(409).send({
                status: false,
                msg: "Invalid ID"
            })
            return;
        }

        try {
            const song = await songModel
                .findById(idSong)
                .populate("album")
                .lean()
                .exec();

            if (!song) {
                res.status(404).send({
                    status: false,
                    msg: "We couldn't find a song with this Id"
                })
            }

            res.status(200).send({
                status: true,
                msg: "We find a song.",
                data: song
            });
        } catch (err) {
            res.status(503).send({
                status: false,
                msg: "Error while fetching song.",
                data: err
            });
        }
    },
    postSong: async (req, res) => {
        const { body, files: { songFile } } = req;

        // if (!mongoose.Types.ObjectId.isValid(body.album)) {
        //     res.status(409).send({
        //         status: false,
        //         msg: "Invalid ID"
        //     })
        //     return;
        // }

        if (!songFile) {
            res.status(409).send({
                status: false,
                msg: "You need to add a song file",
            })
        }
        
        try {
            const data = await switchUploadSong(body, songFile)

            // console.log("EntryTry", data)
            const song = await songModel
                .insertMany(
                    data
                );
            
                console.log("song", song)

            // await albumModel.findByIdAndUpdate(
            //     { _id: body.album },
            //     { "$push": { songs: song._id } },
            //     { new: true }
            // )

            res.status(200).send({
                status: true,
                msg: "Song sucessfully created",
                data: song
            });
        } catch (err) {
            res.status(503).send({
                status: false,
                msg: "ErrorPost",
                data: err.message
            });
        }
    },
    updateSong: async (req, res, next) => {
        const { body: bodyRequest, params: { idSong } } = req;

        if (!mongoose.Types.ObjectId.isValid(idSong)) {
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
                    },
                    {
                        new: true
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

        if (!mongoose.Types.ObjectId.isValid(idSong)) {
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

module.exports = { songController };