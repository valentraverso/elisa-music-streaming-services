const { Types} = require("mongoose");
const { UserModel } = require("../models");


async function verifyRequester(req, res, next) {
    const { userId } = req.body;
    const { sub } = req.auth.payload;

    try {
        const user = await UserModel
            .findOne({
                sub: sub
            })
            .lean()
            .exec();

        if (!user || !new Types.ObjectId(userId).equals(user._id)) {
            res.status(400).send({
                status: false,
                msg: "You can't make this action."
            })

            return;
        }
    
        next();
    } catch (err) {
        res.status(503).send({
            status: false,
            msg: err.message,
        })
    }
}

module.exports = { verifyRequester };