const { mongoose } = require("mongoose");
const { playlistModel, UserModel } = require("../models");
const { songController } = require("./songs.controller");
const { uploadPlaylistImage } = require("../utils/cloudinary");
const fs = require("fs-extra");

const playlistController = {
    getAllPlaylist: async (req, res) => {
        try {
            const playlists = await playlistModel
                .find(
                    {
                        private: false
                    }
                )
                .limit(10)
                .populate({
                    path: "songs",
                    populate: "album"
                });

            if (!playlists) {
                res.status(404).send({
                    status: false,
                    msg: "We couldn't find playlists",
                })
            }

            res.status(200).send(
                playlists
            )
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    getByOwner: async (req, res) => {
        const { params: { idOwner } } = req;

        try {
            const playlist = await playlistModel
                .find({ owner: idOwner })
                .sort({ _id: -1 })
                .lean()
                .exec();

            res.status(200).send({
                status: true,
                msg: "We found playlist.",
                data: playlist
            });
        } catch (err) {
            res.status(503).send({
                status: false,
                msg: err
            })
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        const { sub } = req.auth.payload;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(409).send({
                status: false,
                msg: "Invalid ID"
            })
            return;
        }

        try {
            const playlist = await playlistModel
                .findById(id)
                .populate("songs")
                .populate({
                    path: 'songs',
                    populate: {
                        path: 'album'
                    }
                })
                .lean()
                .exec();

            if (!playlist) {
                return res.status(404).send({
                    status: false,
                    msg: `Playlist ${id} not found`
                })
            }

            if (playlist.private) {
                const user = await UserModel
                    .findOne({ sub: sub })
                    .lean()
                    .exec();

                if (playlist.owner.equals(user._id)) {
                    return res.status(200).send({
                        status: true,
                        msg: "Playlist found it",
                        data: playlist
                    })
                }

                return res.status(404).send({
                    status: false,
                    msg: `Playlist ${id} not found`
                })
            }

            res.status(200).send({
                status: true,
                msg: "Playlist found it",
                data: playlist
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
            const playlistTitle = req.params.title;
            const playlist = await playlistModel
                .find({
                    "title": {
                        "$regex": playlistTitle,
                        "$options": "i"
                    },
                    private: false
                });

            if (playlist.length <= 0) {
                return res.status(404).send({
                    status: false,
                    msg: `Playlist with title "${playlistTitle}" not found`,
                });
            }

            res.status(200).send({
                status: true,
                msg: "Playlist found",
                data: playlist,
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            });
        }
    },
    postPlaylist: async (req, res) => {
        const { body } = req
        try {
            const playlist = await playlistModel
                .create({
                    ...body
                })
                ;

            const user = await UserModel
                .findOneAndUpdate(
                    {
                        _id: playlist.owner
                    },
                    {
                        "$addToSet": { playlists: playlist._id }
                    },
                    {
                        new: true
                    }
                )
                .populate("playlists")
                .populate({
                    path: "playlists",
                    populate: {
                        path: "songs"
                    }
                });


            res.status(201).send({
                status: true,
                msg: "We create a new playlist",
                data: user,
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
    createLikeSongs: async (req, res) => {
        const { userId } = res.locals;
        const { sub } = req.auth.payload;

        try {
            const playlist = await playlistModel
                .create({
                    title: "Likes",
                    owner: userId,
                    likePlaylist: true,
                    private: true,
                    img: {
                        public_id: 'Home/playlists/liked.png',
                        secure_url: 'https://res.cloudinary.com/dppekhvoo/image/upload/v1683710140/Home/playlists/liked.png'
                    }
                });

            if (!playlist) {
                res.status(404).send({
                    status: false,
                    msg: "We coundn't create the like playlist",
                })
                return;
            }

            const user = await UserModel
                .findOneAndUpdate(
                    {
                        sub: sub
                    },
                    {
                        "$addToSet": { playlists: playlist._id },
                        likePlaylist: playlist._id
                    },
                    {
                        new: true
                    }
                )
                .populate("playlists")
                .populate({
                    path: "playlists",
                    populate: {
                        path: "songs"
                    }
                })
                .exec();

            res.status(201).send({
                status: true,
                msg: "We create a new playlist",
                data: user,
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
    updatePlaylistImage: async (req, res) => {
        const { title, private, userId } = req.body;
        const { id } = req.params;
        const { playlistImg } = req.files;

        try {
            const { public_id, secure_url } = await uploadPlaylistImage(playlistImg.tempFilePath);
            await fs.unlink(playlistImg.tempFilePath)

            const updatePlaylist = await playlistModel.findOneAndUpdate(
                { _id: id, owner: userId },
                {
                    title: title,
                    img: {
                        public_id,
                        secure_url
                    },
                    private: private
                },
                { new: true }
            );

            if (!updatePlaylist) {
                res.status(404).send({
                    status: false,
                    msg: "Playlist not found",
                });
                return;
            }

            res.status(200).send({
                status: true,
                msg: "Playlist updated successfully",
                data: updatePlaylist,
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error.message,
            });
        }
    },
    updateLikeSong: async (req, res) => {
        const { id } = req.params;
        const { likePlaylist } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(409).send({
                status: false,
                msg: "Invalid ID"
            })
            return;
        }

        try {
            const playlist = await playlistModel
                .findOneAndUpdate(
                    {
                        _id: likePlaylist,
                    },
                    {
                        "$addToSet": { songs: id }
                    },
                    {
                        new: true
                    }
                )
                .populate("songs")
                .populate({
                    path: 'songs',
                    populate: {
                        path: 'album'
                    }
                })
                .exec();


            res.status(200).send({
                status: true,
                msg: "Song liked",
                data: playlist
            })
        } catch (err) {
            res.status(503).send({
                status: false,
                msg: err.message,
            })
        }
    },
    updateDislikeSongs: async (req, res) => {
        const { id } = req.params;
        const { likePlaylist } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(409).send({
                status: false,
                msg: "Invalid ID"
            })
            return;
        }

        try {
            const playlist = await playlistModel
                .findOneAndUpdate(
                    {
                        _id: likePlaylist,
                    },
                    {
                        "$pull": { songs: id }
                    },
                    {
                        new: true
                    }
                )
                .exec();


            res.status(200).send({
                status: true,
                msg: "Song disliked",
                data: playlist
            })
        } catch (err) {
            res.status(503).send({
                status: false,
                msg: err.message,
            })
        }
    },
    updateEliminateFromPlaylists: async (req, res) => {
        const { playlistId, songId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(songId) || !mongoose.Types.ObjectId.isValid(playlistId)) {
            res.status(409).send({
                status: false,
                msg: "Invalid ID",
            });
            return;
        }

        try {
            const playlists = await playlistModel.updateMany(
                { _id: playlistId },
                {
                    $pull: { songs: songId },
                },
                {
                    new: true,
                }
            );

            res.status(200).send({
                status: true,
                msg: "Song disliked from all playlists",
                data: playlists,
            });
        } catch (err) {
            res.status(503).send({
                status: false,
                msg: err.message,
            });
        }
    },
    updatePlaylistInfo: async (req, res) => {
        const { title, private, userId } = req.body;
        const { id: playlistId } = req.params;
        try {
            const playlist = await playlistModel
                .findOneAndUpdate(
                    {
                        _id: playlistId,
                        owner: userId
                    },
                    {
                        title: title,
                        private: private
                    },
                    { new: true },
                )
            return res.status(200).send({
                status: true,
                msg: "Playlist updated",
                data: playlist,
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
    updatePlaylist: async (req, res) => {
        const { songId, userId } = req.body;
        const { id: playlistId } = req.params;
        try {
            const playlist = await playlistModel
                .findOneAndUpdate(
                    {
                        _id: playlistId,
                        owner: userId
                    },
                    {
                        "$addToSet": { songs: songId },
                    },
                    { new: true },
                )

            res.status(200).send({
                status: true,
                msg: "Playlist updated",
                data: playlist,
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
    deletePlaylist: async (req, res) => {
        try {
            const playlistId = req.params.id
            const deletedPlaylist = await playlistModel.findByIdAndDelete(
                playlistId,
            )
            if (!deletedPlaylist) {
                return res.status(404).send({
                    status: false,
                    msg: `Playlist ${playlistId} not found`
                });
            }

            await songModel.updateMany({ playlists: playlistId }, { $pull: { playlists: playlistId } });

            res.status(200).send({
                status: true,
                msg: "Playlist and related songs updated",
                data: deletedPlaylist,
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    }
}

module.exports = { playlistController };