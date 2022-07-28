import {insertProduct} from '../db/insertProduct';

export const createProduct = async (request) => {
    const error = {message: 'Product was not created'};
    const {title, description, price} = JSON.parse(request.body);
    try {
        const {title, description, price, count} = JSON.parse(request.body);
        if (title && description && price && count) {
            const success = await insertProduct(title, description, price, count);
            if (success) {
                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    }
                };
            }
        }
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            }
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            }
        };
    }
};
