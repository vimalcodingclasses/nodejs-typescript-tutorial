import 'dotenv/config';
import express, { Application } from 'express';
import { createExpressServer } from 'routing-controllers';
import * as bodyParser from 'body-parser';

import { UserController } from './api/controllers/UserController';
import { dataSource } from './db/data-source';

const app: Application = createExpressServer({
    controllers: [UserController]
});

app.use(express.json())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const PORT: number = parseInt(process.env.SERVER_PORT!);

dataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }).catch((err) => {
        console.log('Error in db connection', err);
    });
