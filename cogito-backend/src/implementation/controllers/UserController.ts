import {InternalUserRepository} from "../providers/InternalUserRepository";
import * as express from 'express';
import * as request from 'request';
import {CreateUser, UserWithIdAlreadyExistingError} from "../../logic/use-cases/user/CreateUser";
import {User} from "../../logic/entities/User";
import {ExistsUserWithId} from "../../logic/use-cases/user/ExistsUserWithId";
import {GetUserById} from "../../logic/use-cases/user/GetUserById";

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
                res.status(500).send("Internal Server Error");
            }
        }
    }

    async existsUserWithToken(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const user: User = await this.provider.getGithubUserFromToken(token);
            const result: boolean = await ExistsUserWithId(user.id, this.provider);
            if(result) {
                res.status(200).send();
            } else {
                res.status(404).send("User not existing yet");
            }
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async getAuthorizedUser(req: express.Request, res: express.Response) {
        try {
            const token: string  = <string>req.headers.authorization;
            const user: User = await this.provider.getGithubUserFromToken(token);
            const result: User = await GetUserById(user.id, this.provider);
            res.json(result);
        } catch(e) {
            console.error(e);
            res.status(500).send("Unauthorized User");
        }
    }

    async getUserById(req: express.Request, res: express.Response) {
        try {
            const result: User = await GetUserById(req.params.id, this.provider);
            res.json(result);
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async userRegisteredMw(req: express.Request, res: express.Response, next: any) {
        const token: string = <string>req.headers.authorization;
        const user: User = await this.provider.getGithubUserFromToken(token);
        const result: boolean = await ExistsUserWithId(user.id, this.provider);
        if(result) {
            res.locals.authenticatedUser = await GetUserById(user.id, this.provider);
            next();
        } else {
            res.status(401).send("User not registered");
        }
    }
}