const { UserModel, albumModel } = require("../models");
const { uploadUserImage } = require("../utils/cloudinary");
const fs = require("fs-extra");

const userController = {
    postUser: async (req, res, next) => {
        const { auth: { payload: { sub } } } = req;
        const { name, email, img, role, username, genres } = req.body

        console.log(genres)

        try {
            const searchIfCreated = await UserModel
                .findOne({
                    "$or": [
                        {
                            email: email
                        },
                        {
                            sub: sub
                        },
                        {
                            username: username
                        }
                    ]
                })
                .lean()
                .exec();

            if (searchIfCreated) {
                return res.status(412).send({
                    status: false,
                    msg: "User already registered."
                })
            }

            const user = await UserModel
                .create(
                    {
                        name,
                        email,
                        img: {
                            secure_url: img
                        },
                        sub,
                        role,
                        username,
                        "$set" : {genres: genres}
                    }
                );

            if (!user) {
                res.status(404).send({
                    status: false,
                    msg: "We coundn't create your user",
                })
                return;
            }

            res.locals.userId = user._id;

            next();
        } catch (error) {
            res.status(500).send({
                path: "user controller",
                status: false,
                msg: error.message
            })
        }
    },
    getBySub: async (req, res) => {
        const { sub } = req.auth.payload;

        try {
            const user = await UserModel
                .findOne({ sub: sub })
                .populate("playlists")
                .populate({
                    path: "playlists",
                    populate: {
                        path: "songs"
                    }
                })
                .lean()
                .exec();

            if (!user || user.length === 0) {
                res.status(404).send({
                    status: false,
                    msg: "We coundn't find your user",
                })
                return;
            }

            const albumsShow = user.albums.filter(album => album.status === 1)
            const playlistShow = user.playlists.filter(playlist => !playlist.private)

            const userClear = {
                ...user,
                albums: albumsShow,
                
            }

            res.status(200).send({
                status: true,
                data: user
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    getByUsername: async (req, res) => {
        const { username } = req.params;

        try {
            const user = await UserModel
                .findOne({ username: username })
                .populate({
                    path: "playlists",
                    populate: "songs"
                })
                .populate({
                    path: "albums",
                    populate: "songs"
                })
                .lean()
                .exec();

            if (!user || user.length === 0) {
                res.status(404).send({
                    status: false,
                    msg: "We coundn't find your user",
                })
                return;
            }

            const albumsShow = user.albums.filter(album => album.status === 1)
            const playlistShow = user.playlists.filter(playlist => !playlist.private)

            const userClear = {
                ...user,
                albums: albumsShow,
                playlists: playlistShow
            }

            res.status(200).send({
                status: true,
                data: userClear
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    getById: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await UserModel.findById(userId);

            if (!user) {
                res.status(404).send({
                    status: false,
                    msg: "We coundn't find your user",
                })
                return
            }

            res.status(200).send({
                status: true,
                data: user
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    updateArray: async (req, res) => {
        const { body } = req;
        const { userId } = req.params;
        try {
            const updateUser = await UserModel.findByIdAndUpdate(
                { _id: userId },
                { "$push": { ...body } },
                { new: true }
            );
            res.status(200).send({
                status: true,
                msg: `Sucessfully updated`,
                data: updateUser
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    updateBasic: async (req, res) => {
        const { body } = req;
        const { userId } = req.params;

        try {
            const updateUser = await UserModel.findByIdAndUpdate(
                { _id: userId },
                { name: body.name },
                { new: true }
            );

            if (!updateUser) {
                res.status(404).send({
                    status: false,
                    msg: "User not found",
                });
                return;
            }

            res.status(200).send({
                status: true,
                msg: "User updated successfully",
                data: updateUser,
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error.message,
            });
        }
    },
    updateUserImage: async (req, res) => {
        const { body } = req;
        const { userId } = req.params;
        const { userImg } = req.files;

        try {
            const { public_id, secure_url } = await uploadUserImage(userImg.tempFilePath);
            await fs.unlink(userImg.tempFilePath)

            const updateUser = await UserModel.findByIdAndUpdate(
                { _id: userId },
                {
                    name: body.name,
                    img: {
                        public_id,
                        secure_url
                    }
                },
                { new: true }
            );

            if (!updateUser) {
                res.status(404).send({
                    status: false,
                    msg: "User not found",
                });
                return;
            }

            res.status(200).send({
                status: true,
                msg: "User updated successfully",
                data: updateUser,
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error.message,
            });
        }
    },
    updateFollows: async (req, res) => {
        const { body } = req;

        try {
            const user = await UserModel
                .findOneAndUpdate(
                    { _id: body.userId },
                    { "$addToSet": { follows: body.idVisiting } },
                    { new: true }
                );

            const userVisiting = await UserModel
                .findOneAndUpdate(
                    { _id: body.idVisiting },
                    { "$addToSet": { followers: body.userId } },
                    { new: true }
                );

            if (!user) {
                res.status(404).send({
                    status: false,
                    msg: "User not found",
                });
                return;
            }

            res.status(200).send({
                status: true,
                msg: `Sucessfully updated`,
                data: user
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error.message,
            });
        }
    },
    updateFollowsTypes: async (req, res) => {
        const { id, type } = req.params;
        const { userId } = req.body;

        try {
            const user = await UserModel
                .findOneAndUpdate(
                    {
                        _id: userId
                    },
                    {
                        "$addToSet": { [type]: id }
                    },
                    {
                        new: true
                    }
                )
                .populate({
                    path: "playlists",
                    populate: "songs"
                })
                ;

            res.status(200).send({
                status: true,
                msg: `Sucessfully followed album`,
                data: user
            });
        } catch (err) {
            res.status(500).send({
                status: false,
                msg: err.message,
            })
        }
    },
    updateUnfollowsTypes: async (req, res) => {
        const { id, type } = req.params;
        const { userId } = req.body;

        try {
            const user = await UserModel
                .findOneAndUpdate(
                    {
                        _id: userId
                    },
                    {
                        "$pull": { [type]: id }
                    },
                    {
                        new: true
                    }
                )
                .populate({
                    path: "playlists",
                    populate: "songs"
                });

            res.status(200).send({
                status: true,
                msg: `Sucessfully unfollowed album`,
                data: user
            });
        } catch (err) {
            res.status(500).send({
                status: false,
                msg: err.message,
            });
        }
    },
    updateUnFollows: async (req, res) => {
        const { body } = req;
        try {
            const user = await UserModel.findOneAndUpdate(
                { _id: body.userId },
                { "$pull": { follows: body.idVisiting } },
                { new: true }
            );
            const userVisiting = await UserModel.findOneAndUpdate(
                { _id: body.idVisiting },
                { "$pull": { followers: body.userId } },
                { new: true }
            );

            res.status(200).send({
                status: true,
                msg: `Sucessfully updated`,
                data: user
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    deleteUser: async (req, res) => {
        const { body } = req;
        const { userId } = req.params;
        try {
            const updateUser = await UserModel.findByIdAndUpdate(
                { _id: userId },
                { ...body },
                { new: true }
            );
            res.status(200).send({
                status: true,
                msg: "User deleted successfully",
                data: updateUser
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    getByName: async (req, res) => {
        const { userName } = req.params;
        try {
            const user = await UserModel
                .find({
                    "name": {
                        "$regex": userName,
                        "$options": "i"
                    }
                })
                .lean()
                .exec();

            if (user.length <= 0) {
                res.status(404).send({
                    status: false,
                    msg: "We coundn't find your user",
                })
                return
            }

            res.status(200).send({
                status: true,
                data: user
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    }

}

module.exports = { userController };