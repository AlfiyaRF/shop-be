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
	
export const selectAllProducts = async () => {
    const client = new Client(dbOptions);

    try {
        await client.connect();

        const {rows: products} = await client.query(`
            SELECT id, title, description, price, count FROM public.products INNER JOIN public.stocks ON id = product_id
        `);
        return {
            status: 200,
            products
        };
    } catch (err) {
        return {
            status: 500,
            error: {message: 'Error during database request executing'}
        };
    } finally {
        client.end();
    }
};
