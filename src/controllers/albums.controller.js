const { albumModel, songModel } = require("../models");
const fs = require("fs-extra");
const { uploadAlbum } = require("../utils/cloudinary");


const albumController = {
    getAllAlbum: async (req, res) => {
        try {
            const album = await albumModel
                .find({})
                .populate({
                    path: "songs",
                    populate: "album"
                });

            if (!album) {
                res.status(404).send({
                    status: false,
                    msg: "We coundn't find albums",
                })
            }
            res.status(200).send(
                album
            )
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    createAlbum: async (req, res) => {
        const { body, files } = req
        if (!files.img) {
            res.status(409).send({
                status: false,
                msg: "You need to add a image",
            })
            return;
        }
        try {
            const { public_id, secure_url } = await uploadAlbum(files.img.tempFilePath)
            await fs.unlink(files.img.tempFilePath)

            const newAlbum = await albumModel.create({
                ...body,
                img: { public_id, secure_url }
            });

            res.status(201).send({
                status: true,
                msg: "We create a new album",
                data: newAlbum,
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
    updateAlbum: async (req, res) => {
        try {
            const albumId = req.params.id
            
            const updatedAlbum = await albumModel.findByIdAndUpdate(
                albumId,
                req.body,
                { new: true },
            )
            res.status(201).send({
                status: true,
                msg: "Album update",
                data: updatedAlbum,
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
    getById: async (req, res) => {
        try {
            const albumId = req.params.id
            const album = await albumModel
                .findById({ albumId })

            if (!album) {
                return res.status(404).send({
                    status: false,
                    msg: `album ${albumId} not found`
                }
                )
            }
            res.status(200).send({
                status: true,
                msg: "Album found it",
                data: album
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
    getByTitle: async (req, res) => {
        try {
            const albumTitle = req.params.title;
            const album = await albumModel
                .findOne({ title: albumTitle })
                .populate({
                    path: "songs",
                    populate: "album"
                });
            
            if (!album) {
                return res.status(404).send({
                    status: false,
                    msg: `Album with title "${albumTitle}" not found`,
                });
            }
            
            res.status(200).send({
                status: true,
                msg: "Album found",
                data: album,
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            });
        }
    },    
    deleteAlbum: async (req, res) => {
        try {
            const albumId = req.params.id
            const deletedAlbum = await albumModel.findByIdAndDelete(
                albumId,
            )
            if (!deletedAlbum) {
                return res.status(404).send({
                    status: false,
                    msg: `album ${albumId} not found`
                });
            }

            await songModel.deleteMany({album:albumId});

            res.status(200).send({
                status: true,
                msg: "Album and related songs deleted",
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
}



module.exports = { albumController }