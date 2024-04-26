import { Router } from 'express';
import { check } from 'express-validator';
import validateFields from '../../middlewares/validate_fields.js';
import { login, create } from '../../controllers/auth.js';

const apiAuth = Router();

apiAuth.post(
	'/login',
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		validateFields,
	],
	login
);
apiAuth.post(
	'/register',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		validateFields,
	],
	create
);

export default apiAuth;
