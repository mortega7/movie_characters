import { Router } from 'express';
import { getAll } from '../../controllers/media_types.js';
import validateJWT from '../../middlewares/validate_jwt.js';

const apiMediaTypes = Router();

apiMediaTypes.get('/', [validateJWT], getAll);

export default apiMediaTypes;
