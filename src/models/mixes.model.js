const mongoose = require('mongoose');

const mixSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const mixModel = mongoose.model('Mix', mixSchema);

module.exports = mixModel;