import productsList from './productsList.json';

async function findProductById(id) {
    return productsList.find(product => product.id === id);
}

export const getProductsById = async (event) => {
    const productId = event.pathParameters.productId;
    const product = await findProductById(productId);
    const errorMessage = {message: 'Product not found'};
    try {
        if (product) {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(product)
            };
        } else {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(errorMessage)
            };
        }
    } catch (err) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(err)
        };
    }
};
