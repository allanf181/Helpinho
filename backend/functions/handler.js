DynamoDBClient = require("aws-sdk/clients/dynamodb");

exports.hello = async (event) => {
  //const id = generateId()
  //console.log(id)
  const client = new DynamoDBClient({
    region: "helpinhoRegion",
    endpoint: "http://0.0.0.0:8000",
    accessKeyId: "helpinho",
    secretAccessKey: "helpinho",
  });


  const response = await client.deleteTable({
    TableName: "helpinho_requests",
  }).promise();
  console.log(response);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v4! Your function executed successfully!",
      //id: id,
      //time: getTimestamp(id),
      event: event,
    }),
  };
};
