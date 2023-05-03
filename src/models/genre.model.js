const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
});

const genreModel = mongoose.model('genre', genreSchema);

module.exports = genreModel;
