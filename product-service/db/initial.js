'use strict';

const {Client} = require('pg');
const productsList = require('../src/productsList.json');

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

const productsVariables = productsList.reduce((acc, product, index, arr) => {
    const {description, title, price} = product;
    acc = ''.concat(acc, `('${description}', ${price}, '${title}')`);
    if (index < (arr.length - 1)) {
        acc = ''.concat(acc, ',\n');
    } else {
        acc = ''.concat(acc, ';');
    }
    return acc;
}, '\n');

const getStocksVariables = function(ids) {
    return productsList.reduce((acc, {count}, index, arr) => {
        const id = ids[index];
        acc = ''.concat(acc, `('${id}', ${count})`);
        if (index < (arr.length - 1)) {
            acc = ''.concat(acc, ',\n');
        } else {
            acc = ''.concat(acc, ';');
        }
        return acc;
    }, '\n');
};
	
module.exports.initialFunction = async () => {
    const client = new Client(dbOptions);

    try {
        await client.connect();
        
        const ddlResult = await client.query(`
            CREATE TABLE IF NOT EXISTS public.products (
                id uuid primary key,
                title text,
                description text,
                price integer
            )
        `);
        const ddlResult2 = await client.query(`
            CREATE TABLE IF NOT EXISTS public.stocks (
                product_id uuid primary key,
                count integer,
                foreign key ("product_id") references "products" ("id")
            )
        `);

        const dmlResult = await client.query(`
            INSERT INTO public.products (description, price, title) VALUES ${productsVariables}
        `);
        const {rows: ids} = await client.query(`SELECT id FROM public.products;`);
        const idValues = ids.map(id => id.id);
        const stocksVariables = getStocksVariables(idValues);
        const dmlResult2 = await client.query(`
            INSERT INTO public.stocks (product_id, count) VALUES ${stocksVariables}
        `);

        const {rows: products} = await client.query(`SELECT * FROM public.products`);
        console.log(products);
    } catch (err) {
        console.error('Error during database request executing:', err);
    } finally {
        client.end();
    }
};
