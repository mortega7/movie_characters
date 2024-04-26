import jwt from 'jsonwebtoken';

function generateJWT(uid = '') {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(
			payload,
			process.env.API_KEY,
			{
				expiresIn: '24h',
			},
			(err, token) => {
				if (err) {
					reject('Token not generated');
				} else {
					resolve(token);
				}
			}
		);
	});
}

export default generateJWT;
