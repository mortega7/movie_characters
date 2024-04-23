import { Router } from 'express';
import apiAuth from './api/auth.js';
import apiCharacters from './api/character.js';
import apiMedia from './api/media.js';

const apiRouter = Router();

apiRouter.use('/auth', apiAuth);
apiRouter.use('/characters', apiCharacters);
apiRouter.use('/movies', apiMedia);

export { apiRouter };
