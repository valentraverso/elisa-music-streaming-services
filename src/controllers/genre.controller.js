const { genreModel } = require('../models');

const genreController = {
    getAllGenres: async (req, res) => {
        try {
            const genres = await genreModel.find();
            res.status(200).json(genres);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getGenreById: async (req, res) => {
        try {
            const genre = await genreModel.findById(req.params.id);
            res.status(200).json(genre);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createGenre: async (req, res) => {
        const genre = new genreModel({
            name: req.body.name,
        });

        try {
            const newGenre = await genre.save();
            res.status(201).json(newGenre);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateGenreById: async (req, res) => {
        try {
            const genre = await genreModel.findById(req.params.id);
            if (genre) {
                genre.name = req.body.name || genre.name;

                const updatedGenre = await genre.save();
                res.status(200).json(updatedGenre);
            } else {
                res.status(404).json({ message: "Genre not found" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteGenreById: async (req, res) => {
        try {
          const deletedGenre = await genreModel.findOneAndDelete({ _id: req.params.id });
          if (deletedGenre) {
            res.status(200).json({ message: "Genre deleted" });
          } else {
            res.status(404).json({ message: "Genre not found" });
          }
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
      
    
    getGenreByTitle: async (req, res) => {
        try {
            const genre = await genreModel.findOne({ name: req.params.name });
            if (genre) {
                res.status(200).json(genre);
            } else {
                res.status(404).json({ message: "Genre not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = { genreController };
