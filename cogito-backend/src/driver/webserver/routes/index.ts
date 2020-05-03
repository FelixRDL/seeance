// @ts-ignore
import * as express from 'express';
import * as login from './login';
import * as auth from './api/auth';
import * as user from './api/user';
import * as course from './api/course';
import {AuthController} from "../../../implementation/controllers/AuthController";
import {UserController} from "../../../implementation/controllers/UserController";
const router = express.Router();
const authController = new AuthController();
const userController = new UserController();

router.use('/login', login.router);
router.use('/api/auth', auth.router);
// this abomination is needed, since "this" in typescript is bound to a certain context. TODO: maybe there is a better way?
router.use('/api/user',
    (req: express.Request,res: express.Response, next: any) => authController.validAccessTokenMw(req, res, next),
    user.router);

router.use('/api/course',
    (req: express.Request,res: express.Response, next: any) => authController.validAccessTokenMw(req, res, next),
    (req: express.Request, res: express.Response, next: any) => userController.userRegisteredMw(req, res, next),
    course.router);
export {router};