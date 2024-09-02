const {getDonationById} = require("../../database/donations");
exports.getDonation = async (event) => {
    const donationId = Number(event.pathParameters.donationId);
    const donation = await getDonationById(donationId);
    if(donation instanceof Error){
        return {
            statusCode: 500,
            body: JSON.stringify({error: donation.message}),
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(donation),
    };
}
