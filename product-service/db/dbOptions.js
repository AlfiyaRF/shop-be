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

export default dbOptions;