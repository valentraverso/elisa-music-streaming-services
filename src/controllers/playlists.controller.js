const { Types, default: mongoose } = require("mongoose");
const { playlistModel, songModel, UserModel } = require("../models");

const playlistController = {
    getAllPlaylist: async (req, res) => {
        try {
            const playlists = await playlistModel
                .find({})
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
            const playlist = await playlistModel.findOne({ title: playlistTitle });
            if (!playlist) {
                return res.status(404).send({
                    status: false,
                    msg: `Playlist ${playlistTitle} not found`
                });
            }
            res.status(200).send({
                status: true,
                msg: "Playlist found",
                data: playlist
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            });
        }
    },
    postPlaylist: async (req, res) => {
        const { body } = req
        try {
            const newPlaylist = await playlistModel.create({
                ...body
            });

            res.status(201).send({
                status: true,
                msg: "We create a new playlist",
                data: newPlaylist,
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
    createLikePlaylist: async (req, res) => {
        const { userId } = res.locals;

        try {
            const playlist = await playlistModel.create({
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

            res.status(201).send({
                status: true,
                msg: "We create a new playlist",
                data: playlist,
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
    updateLikeSong: async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(409).send({
                status: false,
                msg: "Invalid ID"
            })
            return;
        }

        console.log(id)

        try {
            const song = await songModel
                .findOneAndUpdate(
                    {
                        _id: id,
                    },
                    {
                        "$push": { songs: id }
                    },
                    {
                        new: true
                    }
                )
                .lean()
                .exec();

            req.status(200).send({
                status: true,
                msg: "Song liked",
                song: song
            })
        } catch (err) {
            res.status(503).send({
                status: false,
                msg: err,
            })
        }
    },
    updatePlaylist: async (req, res) => {
        try {
            const playlistId = req.params.id
            const updatedPlaylist = await playlistModel.findByIdAndUpdate(
                playlistId,
                req.body,
                { new: true },
            )
            res.status(201).send({
                status: true,
                msg: "Playlist updated",
                data: updatedPlaylist,
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