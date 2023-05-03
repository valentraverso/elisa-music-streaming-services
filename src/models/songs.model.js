const {Schema, model, Types} = require("mongoose");

const songSchema = new Schema ({
    title: {
        type: String,
        required: [true, "You must provide the title of the song"],
        max: [80, "You pass the max of 80 characters"]
    },
    artist: {
        type: String,
        required: [true, "You must provide the artist of the album"]
    },
    feat: [{
        type: Schema.Types.ObjectId,
        required: false,
        max: [100, "You pass the max of 100 characters"],
        ref: "users"
    }],
    file: {
        type: String,   
    },
    genre: [{
        type: Schema.Types.ObjectId,
        required: [false, "You must provide the genre of your song"],
        ref: 'genres'
    }],
    album: {
        type: Schema.Types.ObjectId,
        required: [true, "You must provide the album of the song"],
        // max: [1, "The album could only be linked to 1 album"],
        ref: "albums"
    },
    statistics: {
        type: Schema.Types.ObjectId,
        required: [false, "You must provide the ID of the statistics"],
        max: [1, "The statistic can be link to 1 ID only"]
    }
});

const songModel = model('songs', songSchema);
module.exports = songModel;