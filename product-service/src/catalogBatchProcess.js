import axios from 'axios';
import { publishMessage } from './publishMessage';

const CREATE_PRODUCT_URL = 'https://rx3w8zwdt0.execute-api.eu-west-1.amazonaws.com/dev/products';

export const catalogBatchProcess = async (event) => {
    console.log('catalogBatchProcess function');

    const records = event.Records
        .map(record => {
            const {messageId, body} = record;
            console.log('SQS message %s:', messageId, body);
            return body ? JSON.parse(record.body) : null;
        })
        .filter(record => record);

    try {
        console.log('trying to process records')
        const recordsData = {};
        for (let i = 0; i < records.length; i++) {
            const { title, index } = records[i];
            if (!recordsData[index]) {
                console.log(`New product, creating record on the db ${title}`);
                const result = await axios.post(CREATE_PRODUCT_URL, records[i]);
                if (result.status === 200) {
                    console.log('Product was created!');
                    recordsData[index] = true;
                    await publishMessage(records[i]);
                } else {
                    console.log('Problems with creating product');
                }
            } else {
                console.log(`Product ${title} already exists`);
            }
        }
    } catch (err) {
        console.log('Error', err);
    }

    return `Successfully processed ${event.Records.length} messages.`;
};