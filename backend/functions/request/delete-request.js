const {getIdFromToken} = require("../utils");
const {getRequestById, deleteRequest} = require("../../database/requests");
exports.deleteRequest = async (event) => {
    const requestId = Number(event.pathParameters.requestId);
    if (!requestId) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: "Request ID is required"}),
        };
    }

    const request = await getRequestById(requestId);

    if (request.ownerId !== getIdFromToken(event.headers.authorization)) {
        return {
            statusCode: 403,
            body: JSON.stringify({message: "You are not the owner of this request"}),
        };
    }

    const result = await deleteRequest(requestId);
    if (!result) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: "Request not found"}),
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Request deleted successfully"}),
    };
};
