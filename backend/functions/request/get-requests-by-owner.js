const {getRequestsByOwner} = require("../../database/requests");
exports.getRequestsByOwner = async (event) => {
    const owner = Number(event.pathParameters.userId);
    let requests = await getRequestsByOwner(owner);
    return {
        statusCode: 200,
        body: JSON.stringify(requests),
    };
};
