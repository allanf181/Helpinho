const {createHash} = require("crypto");
const {PASSWORD_SALT} = require("../constants");
const {getDynamoDBClient, generateId} = require("./utils");

exports.createUser = async (user) => {
    if(await this.getUserByEmail(user.email)){
        return new Error("User already exists!");
    }

    const newUserParams = {
        TableName: 'helpinho_users',
        Item: {
            userId: Number(generateId()),
            name: user.name,
            email: user.email,
            password: createHash('sha256').update(PASSWORD_SALT + user.password).digest('base64'),
            cpf: user.cpf,
            dataNascimento: user.dataNascimento,
        },
        ReturnValues: "ALL_OLD",
        ConditionExpression: "attribute_not_exists(userId) AND attribute_not_exists(email)",
    };

    console.log("newUserParams", newUserParams);

    try {
        await getDynamoDBClient().put(newUserParams).promise();
        return newUserParams.Item;
    } catch (putError) {
        console.log("There was an error putting the new item.");
        console.log("putError", putError);
        console.log("newUserParams", newUserParams);
        return new Error("There was an error putting the new item.");
    }
}

exports.getUserByEmail = async (email) => {
    const getUserParams = {
        TableName: 'helpinho_users',
        IndexName: 'helpinho_users_email_index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email,
        },
    };

    try {
        const queryResult = await getDynamoDBClient().query(getUserParams).promise();
        if (queryResult.Count === 0) {
            return null;
        }
        return queryResult.Items[0];
    } catch (queryError) {
        console.log("There was an error querying the user.");
        console.log("queryError", queryError);
        console.log("getUserParams", getUserParams);
        return new Error("There was an error querying the user.");
    }
}

exports.getUserById = async (userId) => {
    const getUserParams = {
        TableName: 'helpinho_users',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': Number(userId),
        },
    };

    try {
        const queryResult = await getDynamoDBClient().query(getUserParams).promise();
        if (queryResult.Count === 0) {
            return null;
        }
        return queryResult.Items[0];
    } catch (queryError) {
        console.log("There was an error querying the user.");
        console.log("queryError", queryError);
        console.log("getUserParams", getUserParams);
        return new Error("There was an error querying the user.");
    }
}

exports.updateUserById = async (userId, user) => {
    console.log("userId", userId);
    console.log("user", user);
    const updateUserParams = {
        TableName: 'helpinho_users',
        Key: {
            userId: Number(userId)
        },
        UpdateExpression: "SET #name = :name, #email = :email, #cpf = :cpf, #dataNascimento = :dataNascimento, #password = :password",
        ExpressionAttributeNames: {
            "#name": "name",
            "#email": "email",
            "#cpf": "cpf",
            "#dataNascimento": "dataNascimento",
            "#password": "password"
        },
        ExpressionAttributeValues: {
            ":name": user.name,
            ":email": user.email,
            ":cpf": user.cpf,
            ":dataNascimento": user.dataNascimento,
            ":password": createHash('sha256').update(PASSWORD_SALT + user.password).digest('base64')
        },
        ConditionExpression: "attribute_exists(userId)"
    }

    try {
        await getDynamoDBClient().update(updateUserParams).promise();
        return updateUserParams.Item;
    }
    catch (updateError) {
        console.log("There was an error updating the user.");
        console.log("updateError", updateError);
        console.log("updateUserParams", updateUserParams);
        return new Error("There was an error updating the user.");
    }
}

exports.deleteUserById = async (userId) => {
    const deleteUserParams = {
        TableName: 'helpinho_users',
        Key: {
            userId: Number(userId)
        },
        ReturnValues: "ALL_OLD",
        ConditionExpression: "attribute_exists(userId)"
    };

    try {
        await getDynamoDBClient().delete(deleteUserParams).promise();
        return deleteUserParams.Item;
    }
    catch (deleteError) {
        console.log("There was an error deleting the user.");
        console.log("deleteError", deleteError);
        console.log("deleteUserParams", deleteUserParams);
        return new Error("There was an error deleting the user.");
    }
}
