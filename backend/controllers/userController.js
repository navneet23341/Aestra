const { uploadImage } = require("../services/cloudinaryService");
const userService = require("../services/userService");

const findOutfit = async (req, res) => {

    try {

        const { prompt, style } = req.body;

        const uploadResult = await uploadImage(req.file.buffer, "users");

        const metadata = await userService.processUser({
            imageUrl: uploadResult.secure_url,
            prompt,
            style
        });

        res.json({
            success: true,
            imageUrl: uploadResult.secure_url,
            metadata
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false
        });

    }

};

module.exports = {
    findOutfit
};