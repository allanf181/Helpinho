const {getDonationById, updateDonationById} = require("../../database/donations");
const {getIdFromToken} = require("../utils");
exports.updateDonation = async (event) => {
    const donationId = Number(event.pathParameters.donationId);

    const donation = await getDonationById(donationId);

    if(donation instanceof Error){
        return {
            statusCode: 500,
            body: JSON.stringify({error: donation.message}),
        };
    }
    console.log("donation", donation);
    if(donation.donatorId !== getIdFromToken(event.headers.authorization)){
        return {
            statusCode: 401,
            body: JSON.stringify({error: "Authentication failed"}),
        };
    }

    const amount = JSON.parse(event.body).amount;
    console.log("amount", amount);
    donation.amount = amount;
    const result = await updateDonationById(donationId, donation);
    if(result instanceof Error){
        return {
            statusCode: 500,
            body: JSON.stringify({error: result.message}),
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(donation),
    };
}
