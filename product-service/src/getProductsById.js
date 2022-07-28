import {selectProductById} from '../db/selectProductById';

export const getProductsById = async (event) => {
    const productId = event.pathParameters.productId;
    const data = await selectProductById(productId);
    const errorMessage = {message: 'Product not found'};

    try {
        if (data.status === 200) {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(data.product)
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
            body: JSON.stringify(errorMessage)
        };
    }
};
