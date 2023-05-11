const { uploadSong } = require("./cloudinary");
const uploadMultipleSongs = require("./upload_multiple_songs");
const fs = require("fs-extra");


const switchUploadSong = async (body, arraySongs) => {
    if (arraySongs.length > 1) {
        return uploadMultipleSongs(body, arraySongs);
    }
    const { public_id, secure_url } = await uploadSong(arraySongs.tempFilePath);
    await fs.unlink(arraySongs.tempFilePath)

    const dataResponse = {
        ...body,
        file: {
            public_id,
            secure_url
        }
    }

    return dataResponse
}

module.exports = switchUploadSong