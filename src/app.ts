import 'dotenv/config';
import express, { Application } from 'express';
import { createExpressServer } from 'routing-controllers';
import * as bodyParser from 'body-parser';
import path from 'path';

import { dataSource } from './db/data-source';
import logger from './utils/logger';

const app: Application = createExpressServer({
    controllers: [path.join(__dirname + '/api/controllers/*')]
});

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const PORT: number = parseInt(process.env.SERVER_PORT!);

dataSource.initialize()
    .then(() => {
        logger.info('Database connected successfully');
        app.listen(PORT, () => {
            logger.info(`Server is running on http://localhost:${PORT}`);
        });
    }).catch((err) => {
        logger.error('Error in db connection', err);
    });
