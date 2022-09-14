import {selectProductById} from '../db/selectProductById';
import createResponse from '../utils/createResponse';

export const getProductsById = async (event) => {
    console.log('getProductsById function');

    try {
        const productId = event.pathParameters.productId;
        const data = await selectProductById(productId);
        console.log('request to DB');
        if (data.status === 200) {
            console.log('was successful');
            console.log('product:', data.product);
            return createResponse(data.status, data.product);
        } else {
            console.log('was not successful');
            console.log('error:', data.error);
            return createResponse(data.status, data.error);
        }
    } catch (err) {
        console.log('can not connect with DB');
        return createResponse(500, {message: 'Product not found'});
    }
};
