import {selectProductById} from '../db/selectProductById';
import createResponse from '../utils/createResponse';

export const getProductsById = async (event) => {
    const productId = event.pathParameters.productId;
    const data = await selectProductById(productId);

    try {
        if (data.status === 200) {
            return createResponse(data.status, data.product);
        } else {
            return createResponse(data.status, data.error);
        }
    } catch (err) {
        return createResponse(500, {message: 'Product not found'});
    }
};
