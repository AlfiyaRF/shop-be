import {Client} from 'pg';
import dbOptions from './dbOptions';
	
export const insertProduct = async (title, description, price, count) => {
    const client = new Client(dbOptions);

    try {
        await client.connect();
        const productValue = `('${description}', ${price}, '${title}')`;

        const {rows: id} = await client.query(`
            INSERT INTO public.products (description, price, title) VALUES ${productValue} RETURNING id
        `);
        const stockVariable = `('${id[0].id}', ${count})`;
        const {rows: result} = await client.query(`
            INSERT INTO public.stocks (product_id, count) VALUES ${stockVariable}
        `);
        return result;
    } catch (err) {
        return false;
    } finally {
        client.end();
    }
};
