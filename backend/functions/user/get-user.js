const {getIdFromToken, getTimestamp, assocCreationDate} = require("../utils");
const R = require('ramda');
const {getUserById} = require("../../database/users");
const {DEFAULT_HEADERS} = require("../../constants");

exports.getUser = async (event) => {
    const userId = Number(event.pathParameters.userId);
    let user = await getUserById(userId);
    if (user instanceof Error) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: `User with userId ${userId} not found!`,
            }),
            headers: DEFAULT_HEADERS
        };
    }
    user = assocCreationDate(user, userId);
    let fields = getIdFromToken(event.headers.authorization) === userId ? ["name", "email", "cpf", "dataNascimento", "creationDate"] : ["name", "creationDate"];
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `User with userId ${userId} found!`,
            user: R.pick(fields, user),
        }),
        headers: DEFAULT_HEADERS,
    };
}
