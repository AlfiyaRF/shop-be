import {Client} from 'pg';
import dbOptions from './dbOptions';
	
export const selectProductById = async (productId) => {
    const client = new Client(dbOptions);

    try {
        await client.connect();

        const {rows: product} = await client.query(`
            SELECT id, title, description, price, count FROM public.products INNER JOIN public.stocks ON id = product_id WHERE id = '${productId}'
        `);
        if (product.length) {
            return {
                status: 200,
                product
            };
        } else {
            return {
                status: 404,
                error: {message: 'Product not found'}
            };
        }
    } catch (err) {
        return {
            status: 500,
            error: {message: 'Error during database request executing'}
        };
    } finally {
        client.end();
    }
};
