import AWS from 'aws-sdk';

const snsClient = new AWS.SNS();
const CREATE_PRODUCT_TOPIC_ARN = 'arn:aws:sns:eu-west-1:562467770486:createProductTopic';

export const publishMessage = async (record) => {
    console.log(record.title)
    const { title } = record;

    const params = {
        Message: `New product ${title} created`,
        TopicArn: CREATE_PRODUCT_TOPIC_ARN,
        Subject: 'New Product',
    };
    await snsClient.publish(params).promise();
};
