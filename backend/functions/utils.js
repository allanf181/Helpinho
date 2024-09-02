const {verify} = require("jsonwebtoken");
const { JWT_SECRET, OFFSET} = require("../constants");
const AWS = require("aws-sdk");

const getTimestamp = (id) => {
    const dateBits = Number(BigInt.asUintN(64, String(id)) >> BigInt(22));
    return new Date(dateBits + OFFSET).getTime();
}

const S3 = new AWS.S3({
    s3ForcePathStyle: true,
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
    endpoint: new AWS.Endpoint("http://localhost:4569"),
});

exports.isTokenValid = (token) => {
    try {
        verify(token.replace("Bearer ", ""), JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

exports.getIdFromToken = (token) => {
    try {
        const decoded = verify(token.replace("Bearer ", ""), JWT_SECRET);
        console.log("decoded", decoded);
        return Number(decoded.id);
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.assocCreationDate = (item,  itemId) => {
    return {
        ...item,
        creationDate: getTimestamp(itemId),
    };
}

exports.getS3 = () => {
    return S3;
}
