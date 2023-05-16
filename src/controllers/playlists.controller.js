const { playlistModel, songModel } = require("../models");

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
            console.log(playlists)
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
            const playlist = await song
                .find({ owner: idOwner })
                .lean()
                .exec();

            console.log(playlist)
        } catch (err) {
            res.status(503).send({
                status: false,
                msg: err
            })
        }
    },
    createPlaylist: async (req, res) => {
        try {
          const { title } = req.body;
          const newPlaylist = new playlistModel({ title });
          await newPlaylist.save();
      
          res.status(201).send({
            status: true,
            msg: 'Playlist created',
            data: newPlaylist,
          });
        } catch (error) {
          console.error(error);
          res.status(500).send({
            status: false,
            msg: error,
          });
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
    updatePlaylist: async (req, res) => {
        try {
            const playlistId = req.params.id;
            const newSongs = req.body.songs;
          
            if (!newSongs || newSongs.length === 0) {
              return res.status(400).send({
                status: false,
                msg: "Songs array is required and must not be empty",
              });
            }
          
            const playlist = await playlistModel.findByIdAndUpdate(
              playlistId,
              { $push: { songs: { $each: newSongs } } },
              { new: true }
            );
          
            if (!playlist) {
              return res.status(404).send({
                status: false,
                msg: "Playlist not found",
              });
            }
          
            res.status(201).send({
              status: true,
              msg: "Playlist updated",
              data: playlist,
            });
          } catch (error) {
            console.error(error);
            res.status(500).send({
              status: false,
              msg: "An error occurred while updating the playlist",
            });
          }
      },
      
    getById: async (req, res) => {
        try {
            const playlistId = req.params.id
            const playlist = await playlistModel.findById(playlistId)

            if (!playlist) {
                return res.status(404).send({
                    status: false,
                    msg: `Playlist ${playlistId} not found`
                }
                )
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
    },
}

module.exports = { playlistController };