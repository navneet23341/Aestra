const { uploadImage } = require("../services/cloudinaryService");
const userService = require("../services/userService");

const uploadProfilePhoto = async (req, res) => {

    try {

        const uploadResult = await uploadImage(

            req.file.buffer,
            "users"

        );

        const user = await userService.saveProfilePhoto({

            userId: req.user.id,

            imageUrl: uploadResult.secure_url

        });

        // Start background work
        userService.generateAvatar(user.id, uploadResult.secure_url).catch(console.error);
;

        userService.extractMetadata(user.id, uploadResult.secure_url).catch(console.error);
;

        res.json({

            success: true,
            user

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success:false

        });

    }

};

module.exports = {

    uploadProfilePhoto

};