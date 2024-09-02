const {deleteUserById} = require("../../database/users");
exports.deleteUser = async (event) => {
    const userId = Number(event.pathParameters.userId);
    const { getIdFromToken } = require("../utils");
    const { DEFAULT_HEADERS } = require("../../constants");

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
    if (id !== userId) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Invalid token!",
            }),
            headers: DEFAULT_HEADERS
        };
    }

    if (await deleteUserById(userId) instanceof Error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Error deleting user!",
            }),
            headers: DEFAULT_HEADERS
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `User ${userId} deleted successfully!`,
        }),
        headers: DEFAULT_HEADERS
    };
}
