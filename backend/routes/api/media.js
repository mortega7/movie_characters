import { Router } from 'express';
import {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
} from '../../controllers/media.js';
import validateJWT from '../../middlewares/validate_jwt.js';

const apiMedia = Router();

apiMedia.get('/', [validateJWT], getAll);
apiMedia.get('/:id', [validateJWT], getById);
apiMedia.post('/', [validateJWT], create);
apiMedia.put('/:id', [validateJWT], updateById);
apiMedia.delete('/:id', [validateJWT], deleteById);

export default apiMedia;
