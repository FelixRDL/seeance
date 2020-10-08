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
import {GetUserAutocomplete, GetUserAutocompleteRequest} from "../../logic/use-cases/user/GetUserAutocomplete";
import {
    AddAuthorizeeToCourseById,
    AddAuthorizeeToCourseByIdRequest, OwnerAlreadyAuthorizedForCourseError, UserAlreadyAuthorizedForCourseError
} from "../../logic/use-cases/courses/AddAuthorizeeToCourseById";
import {Course} from "../../logic/entities/Course";
import {
    RemoveAuthorizeeFromCourse,
    RemoveAuthorizeeFromCourseRequest
} from "../../logic/use-cases/courses/RemoveAuthorizeeFromCourse";
import {UserRepository} from "../../logic/repositories/UserRepository";
import {DeleteUserById, DeleteUserByIdRequest} from "../../logic/use-cases/user/DeleteUserById";
import {InternalProjectRepository} from "../providers/InternalProjectRepository";

export class UserController {
    async createUserFromToken(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const provider: InternalUserRepository = new InternalUserRepository(token);
            var user = await provider.getGithubUserFromToken(token);
            user = await CreateUser(user, provider);
            res.json(user);
        } catch (e) {
            if (e instanceof UserWithIdAlreadyExistingError) {
                res.status(409).send("User with id already existing!");
            } else {
                console.error(e);
                res.status(500).send("Internal Server Error");
            }
        }
    }

    async deleteAuthenticatedUser(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const provider : UserRepository = new InternalUserRepository(token);
            await DeleteUserById(<DeleteUserByIdRequest> {
                authenticatedUser: res.locals.authenticatedUser
            },
                provider,
                new InternalCourseRepository(),
                new InternalProjectRepository());
            res.json({
                'message': 'user successfully deleted from platform'
            });
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async existsUserWithToken(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const provider: InternalUserRepository = new InternalUserRepository(token);
            const user: User = await provider.getGithubUserFromToken(token);
            const result: boolean = await ExistsUserWithId(user.id, provider);
            if (result) {
                res.status(200).send();
            } else {
                res.status(404).send("User not existing yet");
            }
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async getAuthorizedUser(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const provider: InternalUserRepository = new InternalUserRepository(token);
            const user: User = await provider.getGithubUserFromToken(token);
            const result: User = await GetUserById(user.id, provider);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(500).send("Unauthorized User");
        }
    }

    async getUserById(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const provider: InternalUserRepository = new InternalUserRepository(token);
            const result: User = await GetUserById(req.params.id, provider);
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async listUsersForCourse(req: express.Request, res: express.Response) {
        const token: string = <string>req.headers.authorization;
        const cProvider: InternalCourseRepository = new InternalCourseRepository();
        const uProvider: InternalUserRepository = new InternalUserRepository(token);
        try {
            const users: User[] = await GetAuthorizedUsersForCourseWithId(<GetAuthorizedUsersForCourseWithIdRequest>{
                courseId: res.locals.courseId
            }, uProvider, cProvider);
            res.json(users);
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async addAuthorizeeToCourse(req: express.Request, res: express.Response) {
        const cProvider: InternalCourseRepository = new InternalCourseRepository();
        try {
            const course: Course = await AddAuthorizeeToCourseById(<AddAuthorizeeToCourseByIdRequest>{
                    user: req.body,
                    courseId: res.locals.courseId
                },
                cProvider
            );
            res.json(course)
        } catch(e) {
            if(e instanceof UserAlreadyAuthorizedForCourseError) {
                res.status(409).send("User is already authorized for course!");
            } else if(e instanceof OwnerAlreadyAuthorizedForCourseError) {
              res.status(400).send("Owner cannot be authorized for course.")
            } else {
                console.error(e);
                res.status(500).send("Internal Server Error");
            }
        }
    }

    async removeAuthorizeeFromCourse(req: express.Request, res: express.Response) {
        const cProvider: InternalCourseRepository = new InternalCourseRepository();
        try {
            await RemoveAuthorizeeFromCourse(<RemoveAuthorizeeFromCourseRequest>{
                    userId: req.params.id,
                    courseId: res.locals.courseId
                },
                cProvider
            );
            res.send();
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async getUserAutocomplete(req: express.Request, res: express.Response) {
        const token: string = <string>req.headers.authorization;
        const uProvider: InternalUserRepository = new InternalUserRepository(token);
        try {
            const users: User[] = await GetUserAutocomplete(<GetUserAutocompleteRequest>{
                q: req.query.q
            }, uProvider);
            res.json(users);
        } catch (e) {
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
        if (result == true) {
            res.locals.authenticatedUser = await GetUserById(user.id, provider);
            next();
        } else {
            res.status(401).send("User not registered");
        }
    }
}