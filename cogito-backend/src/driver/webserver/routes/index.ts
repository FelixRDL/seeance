// @ts-ignore
import * as express from 'express';
import * as login from './login';
import * as auth from './api/auth';
import * as user from './api/user';
const router = express.Router();
router.use('/login', login.router);
router.use('/api/auth', auth.router);
router.use('/api/user', user.router);
export {router};