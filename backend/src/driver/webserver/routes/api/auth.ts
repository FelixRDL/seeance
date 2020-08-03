// @ts-ignore
import * as express from 'express';
import {AuthController} from "../../../../implementation/controllers/AuthController";
import {BadVerificationCodeError} from "../../../../implementation/security/GithubAuthManager";
import {NoTokenProvidedError} from "../../../../logic/use-cases/auth/VerifyToken";

const router = express.Router();
const controller: AuthController = new AuthController();
router.get('/token', async (req: express.Request, res: express.Response) => {
    try {
        const token: string = await controller.getAccessToken(req);
        res.send(token);
    } catch (e) {
        if (e instanceof BadVerificationCodeError) {
            res.status(401).send("Bad Verification Code");
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
});

router.get('/token/validate', async (req: express.Request, res: express.Response) => {
    try {
        const isValid: boolean = await controller.validateAccessToken(req)
        if (isValid) {
            res.send("Valid Token");
        } else {
            res.status(401).send("Invalid Token");
        }
    } catch (e) {
        if (e instanceof NoTokenProvidedError) {
            res.status(400).send("No token was provided!");
        } else {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }
});
export {router}