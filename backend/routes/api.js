import { Router } from 'express';
import apiAuth from './api/auth.js';
import apiCharacters from './api/character.js';
import apiMedia from './api/media.js';
import apiGenre from './api/genre.js';
import apiMediaTypes from './api/media_types.js';

const apiRouter = Router();

apiRouter.use('/auth', apiAuth);
apiRouter.use('/characters', apiCharacters);
apiRouter.use('/movies', apiMedia);
apiRouter.use('/genres', apiGenre);
apiRouter.use('/mediatypes', apiMediaTypes);

export { apiRouter };
