const {UserModel} = require("../models")

const userController={
    signUp: async (req,res) => {
        const {name, email, picture, role} = req.body
        try{
            const user = await UserModel.create({name, email, picture, role});

            if(!user){
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
        }catch(error){
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
}

module.exports = {userController}