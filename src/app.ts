import express, { Application } from 'express';
import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler.middleware';
const app : Application = express();

app.use(express.json());

app.use('/',routes)
app.use(errorHandler)

export default app;


