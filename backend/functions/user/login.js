const {generateToken} = require("./user-utils");
const {getUserByEmail} = require("../../database/users");
exports.login = async (event) => {
    const body = JSON.parse(event.body);
    const { email, password } = body;
    const { createHash } = require('crypto');
    const { PASSWORD_SALT } = require("../../constants");

    const user = await getUserByEmail(email);
    if (!user) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: `Invalid email or password!`,
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers": "Authorization",
            },
        };
    }

    const hashedPassword = createHash('sha256').update(PASSWORD_SALT + password).digest('base64');
    if (user.password !== hashedPassword) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: `Invalid email or password!`,
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers": "Authorization",
            },
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `User ${email} logged in successfully!`,
            token: generateToken(user),
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Authorization",
        },
    };
}
