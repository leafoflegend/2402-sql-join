import pg from 'pg';
import chalk from 'chalk';

const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/2402_sql_join';

export const client = new Client(DATABASE_URL);

export const connectDB = async () => {
    try {
        await client.connect();

        await client.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);

        console.log(chalk.green(`Database connected @ ${DATABASE_URL}`));
    } catch (e) {
        console.log(chalk.red(`Database failed to connect @ ${DATABASE_URL}`));
        throw e;
    }
};
