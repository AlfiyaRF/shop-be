import {Client} from 'pg';

const {
    AWS_PG_HOST,
    AWS_PG_PORT,
    AWS_PG_DATABASE,
    AWS_PG_USERNAME,
    AWS_PG_PASSWORD
} = process.env;

const dbOptions = {
    host: AWS_PG_HOST,
    port: AWS_PG_PORT,
    database: AWS_PG_DATABASE,
    user: AWS_PG_USERNAME,
    password: AWS_PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 10000
};
	
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
