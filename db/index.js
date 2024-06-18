import chalk from 'chalk';
import { client, connectDB } from './db.js';
import { seedSales, createSale, getSales } from './sales.js';
import { seedItems, getItems } from './items.js';
import { seedCustomers, getCustomers } from './customers.js';

const startDB = async (seed = false) => {
    try {
        await connectDB();

        if (seed) {
            await client.query(`
                DROP TABLE IF EXISTS sales;
            `);
            await seedItems();
            await seedCustomers();
            await seedSales();

            console.log(chalk.green(`Seeded successfully.`));
        }

        return client;
    } catch (e) {
        console.log(chalk.red(`Failed to seed and/or start database.`));
        throw e;
    }
}

export const dbMethods = {
    items: {
        getItems,
    },
    customers: {
        getCustomers,
    },
    sales: {
        createSale,
        getSales,
    },
};

export default startDB;
