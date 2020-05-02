import {InternalUserRepository} from "../providers/InternalUserRepository";
import * as express from 'express';
import * as request from 'request';
import {CreateUser, UserWithIdAlreadyExistingError} from "../../logic/use-cases/user/CreateUser";

export class UserController {
    private provider: InternalUserRepository = new InternalUserRepository();
    async createUserFromToken(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            var user = await this.provider.getGithubUserFromToken(token);
            user = await CreateUser(user, this.provider);
            res.json(user);
        } catch(e) {
            if(e instanceof UserWithIdAlreadyExistingError) {
                res.status(409).send("User with id already existing!");
            } else {
                console.error(e);
                res.status(500).send("Internal Server Eror");
            }
        }
    }
}