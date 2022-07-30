import {selectAllProducts} from '../db/selectAllProducts';
import createResponse from '../utils/createResponse';

export const getProductsList = async (event) => {
    console.log('getProductsList function');
    try {
        const data = await selectAllProducts();
        console.log('request to DB');
        if (data.status === 200) {
            console.log('was successful');
            console.log('products list:');
            console.log(data.products);
            return createResponse(data.status, data.products);
        } else {
            console.log('was not successful');
            console.log('error:', data.error);
            return createResponse(data.status, data.error);
        }
    } catch (err) {
        console.log('can not connect with DB');
        return createResponse(500, JSON.stringify({message: 'Product not found'}));
    }
};
