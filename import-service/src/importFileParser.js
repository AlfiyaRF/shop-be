import AWS from 'aws-sdk';
import csvParser from 'csv-parser';

export const importFileParser = async (event) => {
    console.log('importFileParser function');

    try {
        for (const record of event.Records) {
            const s3 = new AWS.S3({region: 'eu-west-1'});
            const BUCKET = 'alfiia-import-service-bucket';
            if (record.s3 && record.s3.object && record.s3.object.key) {
                const key = record.s3.object.key;
                const params = {
                    Bucket: BUCKET,
                    Key: key
                };
                const results = [];

                console.log('getting objects')
                const readStream = s3.getObject(params).createReadStream();

                const files = new Promise((resolve, reject) => {
                    readStream.pipe(csvParser())
                        .on('data', data => {
                            console.log('data:', data);
                            results.push(data);
                        })
                        .on('error', (err) => {
                            console.log('error:', err);
                            reject(err);
                        })
                        .on('end', () => resolve());
                });

                await files;
                console.log('results:', results);

                try {
                    await s3.copyObject({
                        Bucket: BUCKET,
                        CopySource: `${BUCKET}/${key}`,
                        Key: key.replace('uploaded', 'parsed')
                    }).promise();
                    await s3.deleteObject(params).promise();
                    return createResponse(200, {body: 'Successfuly parsed and files'});
                } catch (err) {
                    return createResponse(500, {error: 'Error with moving files'});
                }
            } else {
                return createResponse(404, {error: 'No file'});
            }
        }
    } catch (error) {
        console.error(error);
        return createResponse(500, {error});
    }
}
