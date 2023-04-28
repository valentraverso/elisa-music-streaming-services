const {albumModel} = require("../models");


const albumController = {
    getAllAlbum: async (req, res)=>{
        try{
            const album = await albumModel.find();

            if(!album){
                res.status(404).send({
                    status: false,
                    msg: "We coundn't find albums",
                })
            }

            res.status(200).send({
                status: true,
                msg: "We found albums",
                data: album
            })
        }catch(error){
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
}

module.exports = {albumController}