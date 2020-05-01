// @ts-ignore
import * as express from 'express';
import {AuthController} from "../../../../implementation/controllers/AuthController";
import {BadVerificationCodeError} from "../../../../implementation/security/GithubAuthManager";
const router = express.Router();
const controller: AuthController = new AuthController();
router.get('/token', async (req: express.Request, res: express.Response) => {
    try {
        const token: string = await controller.getAccessToken(req);
        res.send(token);
    } catch(e) {
        if(e instanceof BadVerificationCodeError) {
            res.status(400).send("Bad Verification Code");
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
});
export {router}