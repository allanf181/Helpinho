const {createUser} = require("../../database/users");
const {generateToken} = require("./user-utils");
const {DEFAULT_HEADERS} = require("../../constants");

exports.createUser = async (event) => {
    const body = JSON.parse(event.body);
    const user = await createUser(body);
    if (user instanceof Error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Error creating user!",
            }),
            headers: DEFAULT_HEADERS
        };
    }
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: `User ${user.userId} created successfully!`,
            token: generateToken(user),
        }),
        headers: DEFAULT_HEADERS
    };
};
