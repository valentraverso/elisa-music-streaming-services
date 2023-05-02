const {UserModel} = require("../models")

const userController={
    signUp: async (req,res) => {
        const {name, email, picture, genres, artists, role} = req.body
        try{
            const user = await UserModel.create({name, email, picture, genres, artists, role});

            if(!user){
                res.status(404).send({
                    status: false,
                    msg: "We coundn't find albums",
                })
            }

            res.status(200).send({
                status: true,
                msg: "We found albums",
                data: user
            })
        }catch(error){
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    updateLikes: async (req, res) =>{
        
    }
}