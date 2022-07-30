import {selectAllProducts} from '../db/selectAllProducts';
import createResponse from '../utils/createResponse';

export const getProductsList = async (event) => {
    try {
        const data = await selectAllProducts();
        if (data.status === 200) {
            return createResponse(data.status, data.products);
        } else {
            return createResponse(data.status, data.error);
        }
    } catch (err) {
        return createResponse(500, JSON.stringify({message: 'Product not found'}));
    }
};
