import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import sequelize from './config/database.js';
import initModels from './models/init-models.js';
import { apiRouter } from './routes/api.js';

const APP_PORT = process.env.APP_PORT || 8000;
const app = express();

app.use(helmet()); //Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(cors()); //CORS is a node.js package that provides a Connect/Express middleware for enabling CORS with a variety of options.
app.use(express.json()); //It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.urlencoded({ extended: false })); //It parses incoming requests with JSON payloads and is based on body-parser.
app.use(morgan('combined')); //Morgan is an HTTP request logger middleware for Node.js typically used for Express apps.
app.use(cookieParser()); //Cookie-parser is a middleware that transfers cookies with client requests.
app.use((req, res, next) => {
	const models = initModels(sequelize);
	req.sequelize = sequelize;
	req.models = models;
	next();
});
app.use('/api', apiRouter);

export { app, APP_PORT, sequelize };
