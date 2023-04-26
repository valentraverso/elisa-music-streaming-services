const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true
});

const uploadAlbum = async (filePath) => {
    cloudinary.v2.uploader.upload(filePath, {
        resource_type: 'image',
        folder: "Home/albums"
    })
}

const uploadSong = async (filePath) => {
    cloudinary.v2.uploader.upload(filePath, {
        resource_type: 'audio',
        folder: "Home/songs"
    })
}

module.exports = {
    uploadAlbum,
    uploadSong
};