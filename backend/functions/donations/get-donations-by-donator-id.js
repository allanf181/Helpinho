const {getDonationsByDonatorId} = require("../../database/donations");
exports.getDonationsByDonatorId = async (event) => {
    const donatorId = Number(event.pathParameters.donatorId);
    const donations = await getDonationsByDonatorId(donatorId);
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
