export default function createResponse (statusCode, data) {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    };
    const response = {
        statusCode,
        headers
    };
    if (data) {
        response.body = JSON.stringify(data);
    }
    return response;
};
