const {getDynamoDBClient, generateId} = require("./utils");
exports.createDonation = async (donation) => {
    const {donatorId, requestId, amount} = donation;

    const newDonationParams = {
        TableName: 'helpinho_donations',
        Item: {
            donationId: Number(generateId()),
            donatorId: Number(donatorId),
            requestId: Number(requestId),
            amount: Number(amount),
        },
        ReturnValues: "ALL_OLD",
    };

    try {
        await getDynamoDBClient().put(newDonationParams).promise();
        return newDonationParams.Item;
    } catch (putError) {
        console.log("There was an error putting the new item.");
        console.log("putError", putError);
        console.log("newDonationParams", newDonationParams);
        return new Error("There was an error putting the new item.");
    }
}

exports.getDonationById = async (donationId) => {
    const getDonationParams = {
        TableName: 'helpinho_donations',
        KeyConditionExpression: 'donationId = :donationId',
        ExpressionAttributeValues: {
            ':donationId': Number(donationId),
        },
    };

    try {
        const queryResult = await getDynamoDBClient().query(getDonationParams).promise();
        if (queryResult.Count === 0) {
            return null;
        }
        return queryResult.Items[0];
    } catch (queryError) {
        console.log("There was an error querying the donation.");
        console.log("queryError", queryError);
        console.log("getDonationParams", getDonationParams);
        return new Error("There was an error querying the donation.");
    }
}

exports.updateDonationById = async (donationId, donation) => {
    console.log("donationId", donationId);
    console.log("donation", donation);
    const updateDonationParams = {
        TableName: 'helpinho_donations',
        Key: {
            donationId: Number(donationId)
        },
        UpdateExpression: "SET #donatorId = :donatorId, #requestId = :requestId, #amount = :amount",
        ExpressionAttributeNames: {
            "#donatorId": "donatorId",
            "#requestId": "requestId",
            "#amount": "amount"
        },
        ExpressionAttributeValues: {
            ":donatorId": Number(donation.donatorId),
            ":requestId": Number(donation.requestId),
            ":amount": Number(donation.amount)
        },
        ConditionExpression: "attribute_exists(donationId)"
    }

    try {
        await getDynamoDBClient().update(updateDonationParams).promise();
        return updateDonationParams.Item;
    }
    catch (updateError) {
        console.log("There was an error updating the donation.");
        console.log("updateError", updateError);
        console.log("updateDonationParams", updateDonationParams);
        return new Error("There was an error updating the donation.");
    }
}

exports.deleteDonationById = async (donationId) => {
    const deleteDonationParams = {
        TableName: 'helpinho_donations',
        Key: {
            donationId: Number(donationId)
        },
        ReturnValues: "ALL_OLD",
        ConditionExpression: "attribute_exists(donationId)"
    };

    try {
        await getDynamoDBClient().delete(deleteDonationParams).promise();
        return deleteDonationParams.Item;
    }
    catch (deleteError) {
        console.log("There was an error deleting the donation.");
        console.log("deleteError", deleteError);
        console.log("deleteDonationParams", deleteDonationParams);
        return new Error("There was an error deleting the donation.");
    }
}

exports.getDonationsByDonatorId = async (donatorId) => {
    const getDonationsParams = {
        TableName: 'helpinho_donations',
        IndexName: 'helpinho_donations_donatorId_index',
        KeyConditionExpression: 'donatorId = :donatorId',
        ExpressionAttributeValues: {
            ':donatorId': Number(donatorId),
        },
    };

    try {
        const queryResult = await getDynamoDBClient().query(getDonationsParams).promise();
        if (queryResult.Count === 0) {
            return null;
        }
        return queryResult.Items;
    } catch (queryError) {
        console.log("There was an error querying the donations.");
        console.log("queryError", queryError);
        console.log("getDonationsParams", getDonationsParams);
        return new Error("There was an error querying the donations.");
    }
}

exports.getDonationsByRequestId = async (requestId) => {
    const getDonationParams = {
        TableName: 'helpinho_donations',
        IndexName: 'helpinho_donations_requestId_index',
        KeyConditionExpression: 'requestId = :requestId',
        ExpressionAttributeValues: {
            ':requestId': requestId,
        },
    };
    try {
        const queryResult = await getDynamoDBClient().query(getDonationParams).promise();
        if (queryResult.Count === 0) {
            return null;
        }
        return queryResult.Items;
    } catch (queryError) {
        console.log("There was an error querying the donation.");
        console.log("queryError", queryError);
        console.log("getDonationParams", getDonationParams);
        return new Error("There was an error querying the donation.");
    }
}
