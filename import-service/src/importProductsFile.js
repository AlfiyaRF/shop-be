import AWS from 'aws-sdk';
const BUCKET = 'alfiia-import-service';

export const importProductsFile = async (event) => {
    const s3 = new AWS.S3({region: 'eu-west-1'});
    let status = 200;
    let uploaded = [];
    const params = {
        Bucket: BUCKET,
        Prefix: 'uploaded/'
    };

    try {
        const s3Response = await s3.listObjectsV2(params).promise();
        uploaded = s3Response.Contents;
    } catch (error) {
        console.error(error);
        status = 500;
    }

    const response = {
        statusCode: status,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(
            uploaded.filter(file => file.Size)
                .map(file => `https://${BUCKET}.s3.amazonaws.com/${file.Key}`)
        )
    };
    return response;
};
