const { albumModel } = require("../models");


const albumController = {
    getAllAlbum: async (req, res) => {
        try {
            const album = await albumModel.find();

            if (!album) {
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
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error
            })
        }
    },
    createAlbum: async (req, res) => {
        try {
            const newAlbum = new albumModel(req.body);
            await newAlbum.save();
            res.status(201).send({
                status: true,
                msg: "We create a new album",
                data: newAlbum,
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            })
        }
    },
    updateAlbum: async (req, res) => {
        try {
            const albumId = req.params.id
            const updatedAlbum = await albumModel.findByIdAndUpdate(
                albumId,
                req.body,
                {new: true},
            )
            res.status(201).send({
                status: true,
                msg:"Album update",
                data: updatedAlbum,
            })
        } catch(error) {
            res.status(500).send({
                status:false,
                msg:error,
            })
        }
    },
    getById: async (req, res) =>{
        try{
            const albumId = req.params.id
            const album = await albumModel.findById(
                albumId
            )

            if(!album){
                return res.status(404).send({
                    status : false,
                    msg : `album ${albumId} not found`
                }
                )
            }
            res.status(200).send({
                status: true,
                msg: "Album found it",
                data: album
            })
        }catch(error){
            res.status(500).send({
                status:false,
                msg: error,
            })
        }
    } ,
    deleteAlbum: async (req, res) => {
        try {
            const albumId = req.params.id
            const deletedAlbum = await albumModel.findByIdAndDelete(
                albumId,
            )
            if(!deletedAlbum){
                return res.status(404).send({
                    status : false,
                    msg : `album ${albumId} not found`
                }
                )
            }
            res.status(200).send({
                status: true,
                msg:"Album delete",
                data: deletedAlbum,
            })
        } catch(error) {
            res.status(500).send({
                status:false,
                msg:error,
            })
        }
    },
}



module.exports = { albumController }