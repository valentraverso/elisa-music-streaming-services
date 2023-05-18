const mongoose = require('mongoose');

const mixSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'songs',
    
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const mixModel = mongoose.model('mixes', mixSchema);

module.exports = mixModel;