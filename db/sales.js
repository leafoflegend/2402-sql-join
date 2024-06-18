import { client } from './db.js';

export const seedSales = async () => {
    try {
        // NOTE: payment info would be included in this, that is too large for demo purposes.
        await client.query(`
            DROP TABLE IF EXISTS sales;
            CREATE TABLE IF NOT EXISTS sales (
                id SERIAL PRIMARY KEY,
                customer_id uuid REFERENCES customers(id) NOT NULL,
                item_id uuid REFERENCES items(id) NOT NULL,
                time_of_sale TIMESTAMP DEFAULT now(),
                price_at_time_of_sale FLOAT NOT NULL
            );
        `);
    } catch (e) {
        throw e;
    }
};

export const createSale = async ({
    customerId,
    itemId,
}) => {
    try {
        const { rows: createdSales } = await client.query(`
            INSERT INTO 
                sales (customer_id, item_id, price_at_time_of_sale) 
            VALUES 
                ($1, $2, (SELECT price FROM items WHERE items.id = $2))
            RETURNING *;
        `, [customerId, itemId]);

        return createdSales[0];
    } catch (e) {
        throw e;
    }
};

export const getSales = async () => {
    try {
        const { rows: sales } = await client.query(`
            SELECT sales.price_at_time_of_sale AS price, sales.time_of_sale, customers.email AS customer_email, items.name AS item_name
            FROM sales
            JOIN customers ON sales.customer_id = customers.id
            JOIN items ON sales.item_id = items.id;
        `);

        return sales;
    } catch (e) {
        throw e;
    }
};
