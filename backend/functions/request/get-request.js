const {getRequestById} = require("../../database/requests");
const {assocCreationDate} = require("../utils");
const {getDonationsByRequestId} = require("../../database/donations");
const R = require("ramda");
const {getUserById} = require("../../database/users");
exports.getRequest = async (event) => {
    const requestId = Number(event.pathParameters.requestId);
    let request = await getRequestById(requestId);
    if (request instanceof Error) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: `Request with requestId ${requestId} not found!`,
            }),
        };
    }
    request = assocCreationDate(request, requestId);
    request = R.assoc('donations', await getDonationsByRequestId(requestId), request);
    request = R.assoc('owner', R.omit(["password", "cpf", "dataNascimento"], await getUserById(request.ownerId)), request);

    return {
        statusCode: 200,
        body: JSON.stringify(request),
    };
};
