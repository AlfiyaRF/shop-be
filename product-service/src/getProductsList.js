import {selectAllProducts} from '../db/selectAllProducts';

export const getProductsList = async (event) => {
    const error= {message: 'Product not found'};
    try {
        const data = await selectAllProducts();
        if (data.status === 200) {
            return {
                statusCode: data.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(data.products)
            };
        } else {
            return {
                statusCode: data.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(data.error)
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(error)
        };
    }
};
