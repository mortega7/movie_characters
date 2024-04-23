import { Router } from 'express';
import {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
} from '../../controllers/character.js';
import validateJWT from '../../middlewares/validate_jwt.js';

const apiCharacters = Router();

apiCharacters.get('/', [validateJWT], getAll);
apiCharacters.get('/:id', [validateJWT], getById);
apiCharacters.post('/', [validateJWT], create);
apiCharacters.put('/:id', [validateJWT], updateById);
apiCharacters.delete('/:id', [validateJWT], deleteById);

export default apiCharacters;
