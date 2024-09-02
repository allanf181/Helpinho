const {getUserById, updateUserById} = require("../../database/users");
const {DEFAULT_HEADERS, PASSWORD_SALT} = require("../../constants");
exports.updateUser = async (event) => {
    const userId = event.pathParameters.userId;
    const body = JSON.parse(event.body);
    const { getIdFromToken } = require("../utils");
    const { createHash } = require('crypto');

    if (!body?.email && !body?.password) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "No fields to update!",
            }),
            headers: DEFAULT_HEADERS
        };
    }

    const token = event.headers.authorization;
    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "No token provided!",
            }),
            headers: DEFAULT_HEADERS,
        };
    }
    const id = await getIdFromToken(token);
    console.log("id", id);
    console.log("userId", userId);
    if (id !== Number(userId)) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Invalid token!",
            }),
            headers: DEFAULT_HEADERS
        };
    }
    const user = await getUserById(id);
    if (!user) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: "User not found!",
            }),
            headers: DEFAULT_HEADERS
        };
    }
    if (body.password) {
        user.password = createHash('sha256').update(PASSWORD_SALT + body.password).digest('base64');
    }
    if (body.email) {
        user.email = body.email;
    }

    if (await updateUserById(user.userId, user) instanceof Error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Error updating user!",
            }),
            headers: DEFAULT_HEADERS
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "User updated!",
        }),
        headers: DEFAULT_HEADERS
    };
}
