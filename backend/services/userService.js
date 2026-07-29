const db = require("../config/db");
const extractMetadata = require("./metadata/extractMetadata");

const saveProfilePhoto = async ({ userId, imageUrl }) => {

    const result = await db.query(
        `
        UPDATE users
        SET
            profile_image_url = $1,
            avatar_status = 'PROCESSING',
            metadata_status = 'PROCESSING'
        WHERE id = $2
        RETURNING *
        `,
        [
            imageUrl,
            userId
        ]
    );

    return result.rows[0];

};

const generateAvatar = async (userId, imageUrl) => {

    console.log("Generating avatar...");

};

const extractMetadataJob = async (userId, imageUrl) => {

    await extractMetadata(userId, imageUrl);

};

const saveMetadata = async ({ userId, metadata }) => {

    await db.query(
        `
        UPDATE users
        SET
            profile_metadata = $1,
            metadata_status = 'COMPLETED'
        WHERE id = $2
        `,
        [
            metadata,
            userId
        ]
    );

};

module.exports = {
    saveProfilePhoto, generateAvatar , extractMetadata: extractMetadataJob , saveMetadata
};