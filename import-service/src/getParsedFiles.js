import AWS from 'aws-sdk';
import csvParser from 'csv-parser';

export const getParsedFiles = async (key) => {
    const s3 = new AWS.S3({region: 'eu-west-1'});
    const BUCKET = 'alfiia-import-service-bucket';
    const s3Params = {
        Bucket: BUCKET,
        Key: key
    };
    const parsedFiles = [];

    console.log('getting objects')
    const readStream = s3.getObject(s3Params).createReadStream();

    await new Promise((resolve, reject) => {
        readStream.pipe(csvParser())
            .on('data', data => {
                parsedFiles.push(data);
            })
            .on('error', (err) => {
                console.log('error:', err);
                reject(err);
            })
            .on('end', () => resolve());
    });

    return parsedFiles;
}
