import {insertProduct} from '../db/insertProduct';
import createResponse from '../utils/createResponse';

export const createProduct = async (request) => {
    console.log('createProduct function');

    try {
        const {title, description, price, count} = JSON.parse(request.body);
        if (title && description && price && count) {
            const success = await insertProduct(title, description, price, count);
            console.log('request to DB');
            if (success) {
                console.log('was successful');
                console.log('product was created:');
                console.log(success[0].product_id, title, description, price, count);
                return createResponse(200);
            } else {
                console.log('was not successful');
                console.log(title, description, price, count)
                return createResponse(404, {message: 'Error with creating product'});
            }
        } else {
            console.log('Not full information was provided!');
            console.log('Please, check it:', request.body);
            return createResponse(400, {message: 'Please provide full information'});
        }
    } catch (err) {
        console.log('can not connect with DB');
        return createResponse(500, {message: 'Product was not created'});
    }
};
