import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from '../api/models/User';

export const dataSource = new DataSource({
    type: 'mongodb',
    url: process.env.MONGODB_URI,
    entities: [User],
    synchronize: true,
    logging: false
});
