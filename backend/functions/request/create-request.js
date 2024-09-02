const {createRequest} = require("../../database/requests");
const {getIdFromToken, getS3} = require("../utils");
const {generateId} = require("../../database/utils");


exports.createRequest = async (event) => {
    console.log("event", event);
    const {image, imageBinary, description, target, title, category} = JSON.parse(event.body);

    const name = `${generateId()}-${imageBinary.split('\\').at(-1)}`;

    const base64Image = Buffer.from(image, "base64");
    const contentType = image.split(';')[0].split('/')[1];

    await getS3().putObject({
        Bucket: "local-bucket",
        Key: name,
        Body: base64Image,
        ContentType: contentType,
        ACL: "public-read",
    }).promise();

    const request = {
        image: "http://localhost:4569/local-bucket/"+name,
        description: description,
        category: category,
        target: target,
        title: title,
        owner: getIdFromToken(event.headers.authorization),
    };
    console.log("request", request);
    const result = await createRequest(request);

    if(result instanceof Error){
        return {
            statusCode: 500,
            body: JSON.stringify({error: result.message}),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
};

