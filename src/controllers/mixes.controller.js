const { mixModel } = require('../models');

const mixController = {
    getAllMixes: async (req, res) => {
        try {
            const mixes = await mixModel.find();

            if (!mixes) {
                return res.status(404).send({
                    status: false,
                    msg: "We couldn't find any mixes",
                });
            }

            res.status(200).send({
                status: true,
                msg: 'Mixes found',
                data: mixes,
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            });
        }
    },

    getMixByName: async (req, res) => {
        try {
            const mixName = req.params.name;
            const mix = await mixModel.findOne({ name: mixName });
    
            if (!mix) {
                return res.status(404).send({
                    status: false,
                    msg: `Could not find mix with name ${mixName}`,
                });
            }
    
            res.status(200).send({
                status: true,
                msg: 'Mix found',
                data: mix,
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            });
        }
    },
    

    getMixById: async (req, res) => {
        try {
            const mixId = req.params.id;
            const mix = await mixModel.findById(mixId);

            if (!mix) {
                return res.status(404).send({
                    status: false,
                    msg: `Could not find mix with id ${mixId}`,
                });
            }

            res.status(200).send({
                status: true,
                msg: 'Mix found',
                data: mix,
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            });
        }
    },

    createMix: async (req, res) => {
        try {
            const newMix = new mixModel(req.body);
            await newMix.save();

            res.status(201).send({
                status: true,
                msg: 'Mix created',
                data: newMix,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
              status: false,
              msg: error,
            });
          }
          
    },



    updateMixById: async (req, res) => {
        try {
            const mixId = req.params.id;
            const updatedMix = await mixModel.findByIdAndUpdate(
                mixId,
                req.body,
                { new: true }
            );

            if (!updatedMix) {
                return res.status(404).send({
                    status: false,
                    msg: `Could not find mix with id ${mixId}`,
                });
            }

            res.status(200).send({
                status: true,
                msg: 'Mix updated',
                data: updatedMix,
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            });
        }
    },

    deleteMixById: async (req, res) => {
        try {
            const mixId = req.params.id;
            const deletedMix = await mixModel.findByIdAndDelete(mixId);

            if (!deletedMix) {
                return res.status(404).send({
                    status: false,
                    msg: `Could not find mix with id ${mixId}`,
                });
            }

            res.status(200).send({
                status: true,
                msg: 'Mix deleted',
                data: deletedMix,
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                msg: error,
            });
        }
    },

};

module.exports = { mixController };
