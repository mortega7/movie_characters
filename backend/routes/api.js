import { Router } from 'express';
import apiAuth from './api/auth.js';

const apiRouter = Router();

apiRouter.use('/auth', apiAuth);

export { apiRouter };
