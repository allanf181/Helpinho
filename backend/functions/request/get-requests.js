const {getAllRequests} = require("../../database/requests");
const {getDonationsByRequestId} = require("../../database/donations");
const {getUserById} = require("../../database/users");
const R = require("ramda");

exports.getRequests = async (event) => {
    let requests = await getAllRequests();
    if (event.queryStringParameters?.includeDonations) {
        console.log("includeDonations");
        requests = await Promise.all(requests.map(async request => {
            request.donations = await getDonationsByRequestId(request.requestId);
            return request;
        }));
    }
    requests = await Promise.all(requests.map(async request => {
        request.owner = R.omit(["password", "cpf", "dataNascimento"], await getUserById(request.ownerId));
        return request;
    }));
    console.log(requests);
    return {
        statusCode: 200,
        body: JSON.stringify(requests),
    };
};
