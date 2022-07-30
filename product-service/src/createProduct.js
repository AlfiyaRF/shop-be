import {insertProduct} from '../db/insertProduct';
import createResponse from '../utils/createResponse';

export const createProduct = async (request) => {
    const {title, description, price} = JSON.parse(request.body);

    try {
        const {title, description, price, count} = JSON.parse(request.body);
        if (title && description && price && count) {
            const success = await insertProduct(title, description, price, count);
            if (success) {
                return createResponse(200);
            } else {
                return createResponse(404, {message: 'Error with creating product'});
            }
        } else {
            return createResponse(400, {message: 'Please provide full information'});
        }
    } catch (err) {
        return createResponse(500, {message: 'Product was not created'});
    }
};
