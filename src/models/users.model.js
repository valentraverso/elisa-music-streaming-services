const {Schema, model, Types} = require("mongoose")

const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, 'The name is requerid']
    },
    email:{
        type: String,
        required: [true, 'The email is requerid'],
        unique: true
    },
    picture:{
        type: String
    },
    sub:{
        required: [true],
        type: String
    },
    follows:[{
        type: String,
        ref: "follows"
    }],
    followers:[{
        type: Types.ObjectId,
        ref: "followers"
    }],
    playlists:[{
        type: Types.ObjectId,
        ref: "playlists"
    }],
    albums:[{
        type: Types.ObjectId,
        ref: "albums"
    }],
    genres:[{
        type: Types.ObjectId,
        ref: "genres"
    }],
    artists:[{
        type: Types.ObjectId,
        ref: "artists"
    }],
    role:{
        type: Number,
        default: 1
    },
    status:{
        type: Number,
        default: 1
    }
})

const UserModel = model("User", UserSchema)

module.exports = UserModel