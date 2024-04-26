import bcrypt from 'bcryptjs';
import generateJWT from '../helpers/generate_jwt.js';

async function login(req, res) {
	const { email, password } = req.body;
	const { user } = req.models;

	try {
		//Check if the user already exists
		const userData = await user.findOne({ where: { email } });

		if (!userData) {
			return res.status(401).json({
				error: 'User data not found',
			});
		}

		//Check if the password is correct
		if (!bcrypt.compareSync(password, userData.password)) {
			return res.status(401).json({
				error: 'User data is not correct',
			});
		}

		//Generate JWT
		const token = await generateJWT(userData.id);

		res.status(200).json({
			token,
		});
	} catch (err) {
		res.status(500).json({
			error: err.message || 'An error occurred while processing the request.',
		});
	}
}

async function create(req, res) {
	try {
		const { user } = req.models;
		const { name, email, password } = req.body;

		//Check if the user already exists
		const userData = await user.findOne({ where: { email } });

		if (userData) {
			return res.status(401).json({
				error: 'User already exists',
			});
		}

		//Create the user
		const userRecord = await user.create({
			name,
			email,
			password: bcrypt.hashSync(password, 10),
		});

		res.status(201).json({ id: userRecord.id });
	} catch (err) {
		res.status(500).json({
			error: err.message || 'An error occurred while processing the request.',
		});
	}
}

export { login, create };
