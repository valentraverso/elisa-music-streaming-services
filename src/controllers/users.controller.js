const { UserModel } = require("../models")

const userController = {
    postUser: async (req, res, next) => {
        const { auth: { payload: { sub } } } = req;
        const { name, email, picture, role, username } = req.body

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
                        picture,
                        sub,
                        role,
                        username
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
                .lean()
                .exec();

            if (!user || user.length === 0) {
                res.status(404).send({
                    status: false,
                    msg: "We coundn't find your user",
                })
                return;
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
                { ...body },
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
    updateFollows: async (req, res) => {
        const { body } = req;
        try {
            const user = await UserModel.findOneAndUpdate(
                { _id: body.userId },
                { "$addToSet": { follows: body.idVisiting } },
                { new: true }
            );
            const userVisiting = await UserModel.findOneAndUpdate(
                { _id: body.idVisiting },
                { "$addToSet": { followers: body.userId } },
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
    updateUnFollows: async (req, res) => {
        const { body } = req;
        console.log(body.idVisiting)
        try {
            const user = await UserModel.findOneAndUpdate(
                { _id: body.userId },
                { "$pull": {follows: body.idVisiting} },
                { new: true }
            );
            const userVisiting = await UserModel.findOneAndUpdate(
                { _id:  body.idVisiting},
                { "$pull": {followers: body.userId} },
                { new: true }
            );
            console.log(user)
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