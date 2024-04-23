import { Router } from 'express';
import apiAuth from './api/auth.js';
import apiCharacters from './api/character.js';

const apiRouter = Router();

apiRouter.use('/auth', apiAuth);
apiRouter.use('/characters', apiCharacters);

export { apiRouter };
