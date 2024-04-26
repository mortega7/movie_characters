import 'dotenv/config';
import http from 'http';
import { app, APP_PORT, sequelize } from './app.js';

const server = http.createServer(app);

sequelize
	.authenticate()
	.then(() => {
		console.log('DB connection has been established successfully.');

		server.listen(APP_PORT, () => {
			console.log(`Server running on port: ${APP_PORT}`);
		});
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});
