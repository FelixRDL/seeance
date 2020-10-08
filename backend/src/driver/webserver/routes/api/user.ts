// @ts-ignore
import * as express from 'express';
import {User} from "../../../../logic/entities/User";
import {UserController} from "../../../../implementation/controllers/UserController";

const router = express.Router();
const controller: UserController = new UserController();

router.get('/search', async(req: express.Request, res:express.Response) => {
    controller.getUserAutocomplete(req, res);
});

router.get('/authorizees', async(req: express.Request, res: express.Response) => {
    controller.listUsersForCourse(req, res);
});

router.post('/authorizees', async(req: express.Request, res: express.Response) => {
    controller.addAuthorizeeToCourse(req, res);
});

router.delete('/authorizees/:id', async(req: express.Request, res: express.Response) => {
    controller.removeAuthorizeeFromCourse(req, res);
});

router.post('/register', async (req: express.Request, res: express.Response) => {
    controller.createUserFromToken(req, res);
});

router.get('/registered', async(req: express.Request, res:express.Response) => {
    controller.existsUserWithToken(req, res);
});

router.get('/:id', async(req: express.Request, res:express.Response) => {
    controller.getUserById(req, res);
});

router.get('/', async(req: express.Request, res:express.Response) => {
    controller.getAuthorizedUser(req, res);
});

router.delete('/', controller.userRegisteredMw, async(req: express.Request, res:express.Response) => {
    controller.deleteAuthenticatedUser(req, res);
});


export {router};