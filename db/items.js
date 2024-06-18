import { client } from './db.js';

export const seedItems = async () => {
    try {
        await client.query(`
            DROP TABLE IF EXISTS items;
            CREATE TABLE IF NOT EXISTS items (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                price FLOAT DEFAULT 0.00,
                description TEXT NOT NULL
            );

            INSERT INTO 
                items (name, price, description)
            VALUES 
                ('Wilson Pro Burn Racket', 259.99, 'The top of the line racket that Wilson currently offers.'), 
                ('Trolli Sour Octupus', 2.99, 'If for some reason Worms are not enough, buy these.'),
                ('Turkey BLT', 9.99, 'A BLT, but you know, with Turkey.');
        `);
    } catch (e) {
        throw e;
    }
};

export const getItems = async () => {
    try {
        const { rows: items } = await client.query(`
            SELECT * FROM items;
        `);

        return items;
    } catch (e) {
        throw e;
    }
};
