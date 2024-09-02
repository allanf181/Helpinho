const {createDonation} = require("../../database/donations");
const {getIdFromToken} = require("../utils");
exports.createDonation = async (event) => {
    const requestId = Number(event.pathParameters.requestId);
    const donatorId =  getIdFromToken(event.headers.authorization);
    const amount = JSON.parse(event.body).amount;
    console.log("amount", amount);

    if(!donatorId){
        return {
            statusCode: 401,
            body: JSON.stringify({error: "Authentication failed"}),
        };
    }

    const donation = {
        donatorId: donatorId,
        requestId: requestId,
        amount: amount,
    };

    const result = await createDonation(donation);
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
