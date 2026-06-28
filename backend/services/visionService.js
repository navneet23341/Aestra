const axios = require("axios");
const promptTemplate = require("../prompts/userVisionPrompt");

const extractUserMetadata = async ({
    imageUrl,
    prompt,
    style
})=>{

    const response = await axios.post(

        "https://integrate.api.nvidia.com/v1/chat/completions",

        {

            model:"meta/llama-3.2-90b-vision-instruct",

            temperature:0.2,

            messages:[
                {
                    role:"user",
                    content:[
                        {
                            type:"text",
                            text:promptTemplate(prompt,style)
                        },
                        {
                            type:"image_url",
                            image_url:{
                                url:imageUrl
                            }
                        }
                    ]
                }
            ]

        },

        {
            headers:{
                Authorization:`Bearer ${process.env.Nvidea_API_KEY}`
            }
        }

    );

    let content = response.data.choices[0].message.content;

        console.log("========== RAW MODEL RESPONSE ==========");
        console.log(content);
        console.log("========================================");

        content = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            return JSON.parse(content);
        } catch (err) {
            console.log("Failed to parse JSON.");
            console.log(content);
            throw err;
        }

        }

module.exports={
    extractUserMetadata
}