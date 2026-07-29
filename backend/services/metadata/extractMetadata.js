const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const saveMetadata = require("./saveMetadata");

const extractMetadata = async (userId, imageUrl) => {

    const tempPath = path.join(

        __dirname,

        "../../temp",

        `${userId}.jpg`

    );

    try {

        // Download image

        const response = await axios({

            url: imageUrl,

            method: "GET",

            responseType: "stream"

        });

        await fs.promises.mkdir(

            path.dirname(tempPath),

            { recursive: true }

        );

        const writer = fs.createWriteStream(tempPath);

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {

            writer.on("finish", resolve);

            writer.on("error", reject);

        });

        // Run python

        const python = spawn(

            "python3",

            [

                path.join(

                    __dirname,

                    "../../ai/metadata/extract_metadata.py"

                ),

                tempPath

            ]

        );

        let output = "";

        python.stdout.on("data", (data) => {

            output += data.toString();

        });

        python.stderr.on("data", (data) => {

            console.error(data.toString());

        });

        await new Promise((resolve) => {

            python.on("close", resolve);

        });

        const metadata = JSON.parse(output);

        await saveMetadata({

            userId,

            metadata

        });

        await fs.promises.unlink(tempPath);
        console.log("done")

    }

    catch (err) {

        console.error(err);
        await db.query(
        `
        UPDATE users
        SET metadata_status='FAILED'
        WHERE id=$1
        `,
        [userId]
    );

    }
    finally {

    if (fs.existsSync(tempPath)) {

        await fs.promises.unlink(tempPath);

    }

    }

};

module.exports = extractMetadata;