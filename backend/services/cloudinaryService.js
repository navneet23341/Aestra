const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadImage = async (buffer, folder = "fashion") => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder
            },
            (err, result) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }

            }
        );

        streamifier
            .createReadStream(buffer)
            .pipe(stream);

    });

};

module.exports = {
    uploadImage
};