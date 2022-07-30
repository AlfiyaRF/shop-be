import {Client} from 'pg';
import dbOptions from './dbOptions';
	
export const selectAllProducts = async () => {
    const client = new Client(dbOptions);

    try {
        await client.connect();

        const {rows: products} = await client.query(`
            SELECT id, title, description, price, count FROM public.products INNER JOIN public.stocks ON id = product_id
        `);
        if (products.length) {
            return {
                status: 200,
                products
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
