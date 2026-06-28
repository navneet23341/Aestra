const axios = require("axios");

async function createEmbedding(text) {

    const response = await axios.post(
        "https://integrate.api.nvidia.com/v1/embeddings",
        {
            model: "baai/bge-m3",

            input: [text],

            encoding_format: "float"
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.Nvidea_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data.data[0].embedding;
}

module.exports = createEmbedding;