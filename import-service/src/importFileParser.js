import createResponse from '../utils/createResponse';
import { getParsedFiles } from './getParsedFiles';
import { sendMessage } from './sendMessage';
import { moveFiles } from './moveFiles';

export const importFileParser = async (event) => {
    console.log('importFileParser function');

    try {
        for (const record of event.Records) {
            if (record.s3 && record.s3.object && record.s3.object.key) {
                const key = record.s3.object.key;
                const parsedFiles = await getParsedFiles(key);

                await sendMessage(parsedFiles);

                const [status, body] = await moveFiles(key);
                return createResponse(status, body);
            } else {
                return createResponse(404, {error: 'No file'});
            }
        }
    } catch (error) {
        console.error(error);
        return createResponse(500, {error});
    }
}
