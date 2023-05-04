const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
    title: {
        type: String,
        required: [true, "You must provide a title for the playlist"],
        minlength: [2, "Title must be at least 2 characters long"],
        maxlength: [20, "Title cannot be more than 20 characters long"]
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: [true, "You must provide the ID of the playlist owner"],
        ref: "users"
    },
    songs: [{
        type: Schema.Types.ObjectId,
        required: [true, "You must provide at least one song for the playlist"],
        ref: "songs"
    }],
    img: {
        public_id: {type: String, required: true},
        secure_url: {type: String, required: true}
    }
}, { timestamps: true });

const playlistModel = model("playlists", playlistSchema);

module.exports = playlistModel;