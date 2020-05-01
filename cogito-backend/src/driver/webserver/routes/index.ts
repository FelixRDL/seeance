// @ts-ignore
import * as express from 'express';
import * as login from './login';
const router = express.Router();
router.use('/login', login.router);
export {router};