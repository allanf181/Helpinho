const {getDynamoDBClient, generateId} = require("./utils");

exports.createRequest = async (request) => {
    const params = {
        TableName: "helpinho_requests",
        Item: {
            requestId: Number(generateId()),
            image: request.image,
            description: request.description,
            target: request.target,
            title: request.title,
            category: request.category,
            ownerId: request.owner,
        }
    };
    console.log("params", params);
    try {
        await getDynamoDBClient().put(params).promise();
        return params.Item.requestId;
    } catch (error) {
        console.log(error);
        return new Error("There was an error creating the request.");
    }
};

exports.getRequestById = async (requestId) => {
    const params = {
        TableName: "helpinho_requests",
        Key: {
            requestId: requestId,
        },
        ConditionExpression: "attribute_exists(requestId)"
    };
    try {
        const data = await getDynamoDBClient().get(params).promise();
        return data.Item;
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.getAllRequests = async () => {
    const params = {TableName: "helpinho_requests"};
    let items = [];
    let lastEvaluatedKey = null;
    try {
        while (true) {
            const data = await getDynamoDBClient().scan(params).promise();
            items = items.concat(data.Items);
            lastEvaluatedKey = data.LastEvaluatedKey;
            if (!lastEvaluatedKey) {
                break;
            }
            params.ExclusiveStartKey = lastEvaluatedKey;
        }
        return items.reverse();
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.deleteRequest = async (requestId) => {
    const params = {
        TableName: "helpinho_requests",
        Key: {
            requestId: requestId,
        },
        ConditionExpression: "attribute_exists(requestId)"
    };
    try {
        await getDynamoDBClient().delete(params).promise();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

exports.getRequestsByOwner = async (ownerId) => {
    const params = {
        TableName: "helpinho_requests",
        IndexName: "helpinho_requests_owner_index",
        KeyConditionExpression: "ownerId = :ownerId",
        ExpressionAttributeValues: {
            ":ownerId": ownerId,
        }
    };
    try {
        const data = await getDynamoDBClient().query(params).promise();
        return data.Items;
    } catch (error) {
        console.log(error);
        return false;
    }
};

exports.updateRequestById = async (requestId, request) => {
    const params = {
        TableName: "helpinho_requests",
        Key: {
            requestId: requestId,
        },
        UpdateExpression: "SET #image = :image, #description = :description, #target = :target, #title = :title",
        ExpressionAttributeNames: {
            "#image": "image",
            "#description": "description",
            "#target": "target",
            "#title": "title"
        },
        ExpressionAttributeValues: {
            ":image": request.image,
            ":description": request.description,
            ":target": request.target,
            ":title": request.title,
        },
        ConditionExpression: "attribute_exists(requestId)"
    };
    try {
        await getDynamoDBClient().update(params).promise();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

