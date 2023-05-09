const { uploadSong } = require("./cloudinary");
const uploadMultipleSongs = require("./upload_multiple_songs");
const fs = require("fs-extra");


const switchUploadSong = async (body, arraySongs) => {
    switch (typeof arraySongs) {
        case "array":
            return uploadMultipleSongs(body, arraySongs);
        case "object":
            const { public_id, secure_url } = uploadSong(arraySongs.tempFilePath);
            await fs.unlink(arraySongs.tempFilePath)

            const dataResponse = {
                ...body,
                file: {
                    public_id,
                    secure_url
                }
            }
            console.log(dataResponse)
            return dataResponse
    }
}

module.exports = switchUploadSong