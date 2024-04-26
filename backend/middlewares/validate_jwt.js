import jwt from 'jsonwebtoken';

async function validateJWT(req, res, next) {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader?.startsWith('Bearer ')) {
		return res.status(401).json({
			error: 'Unauthorized.',
		});
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({
			error: 'Token is required.',
		});
	}

	try {
		const { user } = req.models;
		const { uid } = jwt.verify(token, process.env.API_KEY);

		//Check the user
		const userData = await user.findOne({ where: { id: uid } });

		if (!userData) {
			return res.status(401).useChunkedEncodingByDefault({
				error: 'Token not valid - User not exists',
			});
		}

		req.user = userData;
		req.uid = uid;

		next();
	} catch (err) {
		res.status(401).json({
			error: 'Token not valid',
		});
	}
}

export default validateJWT;
