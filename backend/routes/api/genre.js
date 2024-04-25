import { Router } from 'express';
import { getAll, getById } from '../../controllers/genre.js';
import validateJWT from '../../middlewares/validate_jwt.js';

const apiGenre = Router();

apiGenre.get('/', [validateJWT], getAll);
apiGenre.get('/:id', [validateJWT], getById);

export default apiGenre;
