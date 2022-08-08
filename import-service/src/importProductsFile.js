import AWS from 'aws-sdk';
import createResponse from '../utils/createResponse';

export const importProductsFile = async (event) => {
    console.log('importProductsFile function');
    const BUCKET = 'alfiia-import-service-bucket';
    let status = 200;
    let body = {};

    try {
        const fileName = event.queryStringParameters.name;
        const s3 = new AWS.S3({region: 'eu-west-1'});

        const params = {
            Bucket: BUCKET,
            Key: `uploaded/${fileName}`,
            Expires: 60,
            ContentType: 'text/csv'
        };
        const url = s3.getSignedUrl('putObject', params);
        body = {url};
    } catch (error) {
        console.error(error);
        status = 500;
        body = {error};
    }
    return createResponse(status, body);
};
