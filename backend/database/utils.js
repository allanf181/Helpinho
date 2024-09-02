const AWS = require('aws-sdk');
const {default: SnowflakeId} = require("snowflake-id");
const {OFFSET} = require("../constants");

const dynamodbClient = new AWS.DynamoDB.DocumentClient({
    region: 'helpinhoRegion',
    endpoint: 'http://0.0.0.0:8000',
    accessKeyId: 'helpinho',
    secretAccessKey: 'helpinho',
});

exports.getDynamoDBClient = () => {
    return dynamodbClient;
}

const snowflake = new SnowflakeId({
    mid: Math.floor(Math.random() * 1024),
    offset: OFFSET
});

exports.generateId = () => {
    return Number(snowflake.generate());
}
