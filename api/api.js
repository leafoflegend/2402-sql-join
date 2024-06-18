import { Router } from 'express';
import { dbMethods } from '../db/index.js';

const apiRouter = Router();

apiRouter.get('/customers', async (req, res, next) => {
    try {
        const customers = await dbMethods.customers.getCustomers();

        res.send({
            customers,
        });
    } catch (e) {
        next(e);
    }
});

apiRouter.get('/items', async (req, res, next) => {
    try {
        const items = await dbMethods.items.getItems();

        res.send({
            items,
        });
    } catch (e) {
        next(e);
    }
});

apiRouter.post('/sales', async (req, res, next) => {
    const { customerId, itemId } = req.body;

    try {
        const sale = await dbMethods.sales.createSale({
            customerId,
            itemId,
        });

        res.status(201).send({
            message: `Sale successful!`,
            sale,
        });
    } catch (e) {
        next(e);
    }
});

apiRouter.get('/sales', async (req, res, next) => {
    try {
        const sales = await dbMethods.sales.getSales();

        res.send({
            sales,
        });
    } catch (e) {
        next(e);
    }
});

export default apiRouter;
