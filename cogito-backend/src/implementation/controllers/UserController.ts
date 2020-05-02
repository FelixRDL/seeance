import {InternalUserRepository} from "../providers/InternalUserRepository";
import * as express from 'express';
import * as request from 'request';
import {CreateUser} from "../../logic/use-cases/user/CreateUser";

export class UserController {
    private provider: InternalUserRepository = new InternalUserRepository();
    async createUserFromToken(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const user = await this.provider.getGithubUserFromToken(token);
            res.json(user);
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Eror");
        }
    }
}