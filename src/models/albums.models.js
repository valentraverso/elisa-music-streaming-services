const {Schema, model} = require("mongoose");

const albumSchema = new Schema({
    title: {
        type: String,
        required: [true, "You need to add the title for the album"]
    },
    artist: {
        type: String,
        required: [true, "You need to add the artist for the album"]
    },
    songs: {
        type: Array,
        required: [true, "You need to add the songs for the album"]
    }
})

const albumModel = model("albums", albumSchema)

module.exports = albumModel