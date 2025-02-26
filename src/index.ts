import dotenv from 'dotenv';
import Server from './server';

dotenv.config();

Server.listen(process.env.PORT || 3001);
