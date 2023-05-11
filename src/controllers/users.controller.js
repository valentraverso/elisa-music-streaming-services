const { UserModel } = require("../models")

const userController = {
    signUp: async (req, res) => {
        const { name, email, picture, sub, role } = req.body
        try {
            const user = await UserModel.create({ name, email, picture, sub, role });

            if (!user) {
                res.status(404).send({
                    status: false,
                    msg: "We coundn't create your user",
                })
            }

            res.status(200).send({
                status: true,
                msg: "User was created successfully",
                data: user
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    getBySub: async (req, res) => {
        const { auth: { payload: { sub } } } = req;

        try {
            const user = await UserModel
                .find({ sub: sub })
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
            const user = await UserModel.find({ name: userName });
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