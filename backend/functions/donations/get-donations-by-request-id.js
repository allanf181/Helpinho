const {getDonationsByRequestId} = require("../../database/donations");
exports.getDonationsByRequestId = async (event) => {
    const requestId = Number(event.pathParameters.requestId);
    const donations = await getDonationsByRequestId(requestId);
    if(donations instanceof Error){
        return {
            statusCode: 500,
            body: JSON.stringify({error: donations.message}),
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(donations),
    };
}
