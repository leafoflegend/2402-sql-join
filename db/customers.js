import { client } from './db.js';

export const seedCustomers = async () => {
    try {
        await client.query(`
            DROP TABLE IF EXISTS customers;
            CREATE TABLE IF NOT EXISTS customers (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                email VARCHAR(255) NOT NULL,
                join_date TIMESTAMP DEFAULT now()
            );

            INSERT INTO customers (email)
            VALUES ('me@eliot.com'), ('bob@odenkirk.com'), ('tim@eric.com');
        `);
    } catch (e) {
        throw e;
    }
};

export const getCustomers = async () => {
    try {
        const { rows: customers } = await client.query(`
            SELECT * FROM customers;
        `);

        return customers;
    } catch (e) {
        throw e;
    }
};
