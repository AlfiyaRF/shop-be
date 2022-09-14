import AWS from 'aws-sdk';

export const moveFiles = async (key) => {
    const s3 = new AWS.S3({region: 'eu-west-1'});
    const BUCKET = 'alfiia-import-service-bucket';

    try {
        await s3.copyObject({
            Bucket: BUCKET,
            CopySource: `${BUCKET}/${key}`,
            Key: key.replace('uploaded', 'parsed')
        }).promise();
        await s3.deleteObject(params).promise();
        return [200, {body: 'Successfuly parsed and files'}];
    } catch (err) {
        return [500, {error: 'Error with moving files'}];
    }
}