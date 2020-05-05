// @ts-ignore
import * as express from 'express';
import {User} from "../../../../logic/entities/User";
import {UserController} from "../../../../implementation/controllers/UserController";

const router = express.Router();
const controller: UserController = new UserController();
router.post('/register', async (req: express.Request, res: express.Response) => {
    controller.createUserFromToken(req, res);
});

router.get('/registered', async(req: express.Request, res:express.Response) => {
    controller.existsUserWithToken(req, res);
})

router.get('/:id', async(req: express.Request, res:express.Response) => {
    controller.getUserById(req, res);
})

router.get('/', async(req: express.Request, res:express.Response) => {
    controller.getAuthorizedUser(req, res);
})
export {router};