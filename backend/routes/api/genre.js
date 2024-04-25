import { Router } from 'express';
import { getAll } from '../../controllers/genre.js';
import validateJWT from '../../middlewares/validate_jwt.js';

const apiGenre = Router();

apiGenre.get('/', [validateJWT], getAll);

export default apiGenre;
