const cloudinary = require("../config/cloudinary");
const axios = require("axios");
const db = require("../config/db");
const streamifier = require("streamifier");
const { uploadImage } = require("../services/cloudinaryService");

const handleSubmit = async (req, res) => {

    try{

        const {
            title,
            brand,
            price,
            gender,
            category,
            link
        } = req.body;

        console.log(req.body);
        console.log(req.file);

        // ==========================
        // Upload to Cloudinary
        // ==========================

        const uploadResult = await uploadImage(req.file.buffer);

        console.log("Uploaded:",uploadResult.secure_url);

        // ==========================
        // Gemini Vision
        // ==========================

        const aiResponse = await axios.post(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            {
                model: "meta/llama-3.2-90b-vision-instruct",

                temperature: 0.2,

                messages: [
                    {
                        role: "user",

                        content: [
                            {
                                type: "text",

                                text: `
        You are an expert fashion stylist.

        Analyze the clothing item in the image.

        Return ONLY valid JSON.

        Do NOT use markdown.
        Do NOT explain anything.

        {
        "primary_color":"",
        "secondary_colors":[],
        "category":"",
        "subcategory":"",
        "fit":"",
        "silhouette":"",
        "material":"",
        "fabric_texture":"",
        "pattern":"",
        "season":[],
        "occasion":[],
        "style_core":[],
        "fashion_aesthetic":[],
        "keywords":[],
        "matching_colors":[],
        "recommended_bottoms":[],
        "recommended_shoes":[],
        "recommended_accessories":[],
        "confidence":0
        }
        `
                            },

                            {
                                type: "image_url",

                                image_url: {
                                    url: uploadResult.secure_url
                                }
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.Nvidea_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        let content = aiResponse.data.choices[0].message.content;

        content = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const metadata = JSON.parse(content);

        console.log(metadata);

        // ==========================
        // Later
        // Insert into PostgreSQL
        await db.query(
            `
            INSERT INTO products
            (
            title,
            brand,
            price,
            gender,
            category,
            buy_link,
            image_url,
            metadata
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8)
            `,
            [
            title,
            brand,
            price,
            gender,
            category,
            link,
            uploadResult.secure_url,
            metadata
            ]
            );
        // ==========================

        res.json({
            success:true,
            message:"Product uploaded successfully."
        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            success:false
        });

    }

};

module.exports = handleSubmit;