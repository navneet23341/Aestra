const visionService = require("./visionService");

const processUser = async ({
    imageUrl,
    prompt,
    style
})=>{

    const metadata = await visionService.extractUserMetadata({
        imageUrl,
        prompt,
        style
    });

    return metadata;

}

module.exports={
    processUser
}