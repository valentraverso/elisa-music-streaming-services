const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true
});

const uploadAlbum = async () => {
    cloudinary.v2.uploader.upload(filePath, {
        resource_type: 'image',
        folder: "Home/albums"
    })
}

module.exports = {
    uploadAlbum
};