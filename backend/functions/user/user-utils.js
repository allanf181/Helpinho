const { JWT_SECRET } = require("../../constants");
const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign({ email: user.email, id: user.userId, name: user.name }, JWT_SECRET, { expiresIn: '6h' });
}

