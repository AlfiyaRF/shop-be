'use strict';

const {Client} = require('pg');
const productsList = require('./src/productsList.json');

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
    connectionTimeoutMillis: 5000
};

const productsVariables = productsList.reduce((acc, product, index, arr) => {
    const {description, title, price} = product;
    acc = ''.concat(acc, `(${description}, ${price}, ${title})`);
    if (index < (arr.length - 1)) {
        acc = ''.concat(acc, ', ');
    }
    return acc;
}, '');
	
module.exports.dbTest = async () => {
    const client = new Client(dbOptions);
    await client.connect();

    try {
        const ddlResult = await client.query(`
            create table if not exists products (
                id uuid primary key,
                title text,
                description text,
                price integer
            )
        `);
        const ddlResult2 = await client.query(`
            create table if not exist stocks (
                product_id uuid primary key,
                count integer,
                foreign key ("product_id") references "products" ("id")
            )
        `);

        const dmlResult = await client.query(`
            insert into products (description, price, title) values
            ${productsVariables}
        `);
        const dmlResult2 = await client.query(`
            insert into stocks (description, price, title) values
            ${productsVariables}
        `);

        const {rows: products} = await client.query(`select * from products`);
        console.log(products)
    } catch (err) {
        console.error('Error during database request executing:', err);
    } finally {
        client.end();
    }
};
