import {InternalUserRepository} from "../providers/InternalUserRepository";
import * as express from 'express';
import {CreateUser, UserWithIdAlreadyExistingError} from "../../logic/use-cases/user/CreateUser";
import {User} from "../../logic/entities/User";
import {ExistsUserWithId} from "../../logic/use-cases/user/ExistsUserWithId";
import {GetUserById} from "../../logic/use-cases/user/GetUserById";
import {InternalCourseRepository} from "../providers/InternalCourseRepository";
import {
    GetAuthorizedUsersForCourseWithId,
    GetAuthorizedUsersForCourseWithIdRequest
} from "../../logic/use-cases/user/GetAuthorizedUsersForCourse";

export class UserController {
    async createUserFromToken(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const provider: InternalUserRepository = new InternalUserRepository(token);
            var user = await provider.getGithubUserFromToken(token);
            user = await CreateUser(user, provider);
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
            const provider: InternalUserRepository = new InternalUserRepository(token);
            const user: User = await provider.getGithubUserFromToken(token);
            const result: boolean = await ExistsUserWithId(user.id, provider);
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
            const provider: InternalUserRepository = new InternalUserRepository(token);
            const user: User = await provider.getGithubUserFromToken(token);
            const result: User = await GetUserById(user.id, provider);
            res.json(result);
        } catch(e) {
            console.error(e);
            res.status(500).send("Unauthorized User");
        }
    }

    async getUserById(req: express.Request, res: express.Response) {
        try {
            const token: string  = <string>req.headers.authorization;
            const provider: InternalUserRepository = new InternalUserRepository(token);
            const result: User = await GetUserById(req.params.id, provider);
            res.json(result);
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async listUsersForCourse(req: express.Request, res: express.Response) {
        const token: string = <string>req.headers.authorization;
        const cProvider: InternalCourseRepository = new InternalCourseRepository();
        const uProvider: InternalUserRepository = new InternalUserRepository(token);
        console.log("Yay");
        try {
            const users: User[] =  await GetAuthorizedUsersForCourseWithId(<GetAuthorizedUsersForCourseWithIdRequest>{
                courseId: res.locals.courseId
            }, uProvider, cProvider);
            console.log(users);
            res.json(users);
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    /**
     * Middlewares
     */


    async userRegisteredMw(req: express.Request, res: express.Response, next: any) {
        const token: string = <string>req.headers.authorization;
        const provider: InternalUserRepository = new InternalUserRepository(token);
        const user: User = await provider.getGithubUserFromToken(token);
        const result: boolean = await ExistsUserWithId(user.id, provider);
        console.log(result);
        if(result == true) {
            res.locals.authenticatedUser = await GetUserById(user.id, provider);
            next();
        } else {
            res.status(401).send("User not registered");
        }
    }
}