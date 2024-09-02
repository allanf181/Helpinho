const {getRequestById, updateRequestById} = require("../../database/requests");
const {getIdFromToken} = require("../utils");
exports.updateRequest = async (event) => {
    const requestId = Number(event.pathParameters.requestId);
    if (!requestId) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: "Request ID is required"}),
        };
    }

    const request = await getRequestById(requestId);
    if (!request) {
        return {
            statusCode: 404,
            body: JSON.stringify({message: "Request not found"}),
        };
    }

    if (request.ownerId !== getIdFromToken(event.headers.authorization)) {
        return {
            statusCode: 403,
            body: JSON.stringify({message: "You are not the owner of this request"}),
        };
    }

    const {image, description, target, title} = JSON.parse(event.body);

    if (image) {
        request.image = image;
    }
    if (description) {
        request.description = description;
    }
    if (target) {
        request.target = target;
    }
    if (title) {
        request.title = title;
    }
    console.log("request", request);
    const result = await updateRequestById(requestId, request);
    if (!result) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: "Request not found"}),
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Request updated successfully"}),
    };
}
