import AWS from 'aws-sdk';

export const sendMessage = async (parsedFiles) => {
    const sqs = new AWS.SQS({region: 'eu-west-1'});
    const sqsParams = {
        QueueUrl: process.env.QUEUE_URL
    };
    parsedFiles.forEach((file, index) => {
        file.index = index;
        sqsParams.MessageBody = JSON.stringify(file);

        sqs.sendMessage(sqsParams, function(err, data) {
            console.log('sending message to sqs');
            if (err) {
                console.log("Error", err);
            } else {
                console.log("data", data);
            }
            });
    });
}
