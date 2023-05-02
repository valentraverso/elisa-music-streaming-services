const {Schema, model, Types} = require("mongoose");

const albumSchema = new Schema({
    title: {
        type: String,
        required: [true, "You need to add the title for the album"],
        minlength: [2, "Title must be at least 2 characters long"],
        maxlength: [20, "Title cannot be more than 20 characters long"]
    },
    artist: {
        type: String,
        required: [false, "You need to add the artist for the album"],
    },
    songs: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "songs",
        default: []
        }],
    release: {
        type: Date,
        required: [true, "You need to add the release date for the album"]
    },
    img: {
        type: Object,
        required: [true, "You need to add the image for the album"]
    },
    statistics: {
        type: Schema.Types.ObjectId,
        ref: "stadistics"
    },
    discography: {
        type: String,
        required: [true, "You need to add the discography for the album"]
    }
},
{timestamps:true}
);


const albumModel = model("albums", albumSchema)

module.exports = albumModel