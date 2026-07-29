const db = require("../../config/db");

const saveMetadata = async ({ userId, metadata }) => {

    await db.query(
        `
        UPDATE users
        SET
            metadata = $1,
            metadata_status='COMPLETED'
        WHERE id=$2
        `,
        [
            metadata,
            userId
        ]
    );

};

module.exports = saveMetadata;