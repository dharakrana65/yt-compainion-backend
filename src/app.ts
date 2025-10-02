import express, { Application } from 'express';
import routes from './routes/index';
const app : Application = express();

app.use(express.json());

app.use('/',routes)
export default app;

//for test
