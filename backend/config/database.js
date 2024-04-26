import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
		logging: false,
		define: {},
	}
);

export default sequelize;
