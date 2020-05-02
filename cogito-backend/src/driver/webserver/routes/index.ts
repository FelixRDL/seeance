// @ts-ignore
import * as express from 'express';
import * as login from './login';
import * as auth from './api/auth';
import * as user from './api/user';
import {AuthController} from "../../../implementation/controllers/AuthController";
const router = express.Router();
const authController = new AuthController();

router.use('/login', login.router);
router.use('/api/auth', auth.router);
// this abomination is needed, since "this" in typescript is bound to a certain context. TODO: maybe there is a better way?
router.use('/api/user',
    (req: express.Request,res: express.Response, next: any) => authController.validAccessTokenMw(req, res, next),
    user.router);
export {router};