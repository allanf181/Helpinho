interface Event {
  body: string | null;
  headers: { [name: string]: string };
  multiValueHeaders: { [name: string]: string[] };
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: { [name: string]: string } | null;
  queryStringParameters: { [name: string]: string } | null;
  multiValueQueryStringParameters: { [name: string]: string[] } | null;
  stageVariables: { [name: string]: string } | null;
  requestContext: {
    accountId: string;
    resourceId: string;
    stage: string;
    requestId: string;
    identity: {
      sourceIp: string;
      userAgent: string;
    };
    authorizer: { [name: string]: any } | null;
  };
  resource: string;
}

interface Result {
  statusCode: number;
  headers?: { [header: string]: boolean | number | string };
  multiValueHeaders?: { [header: string]: (boolean | number | string)[] };
  body: string;
  isBase64Encoded?: boolean;
}
