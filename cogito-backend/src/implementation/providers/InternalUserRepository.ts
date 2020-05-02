import {UserRepository} from "../../logic/repositories/UserRepository";
import {User} from "../../logic/entities/User";
import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";
import * as request from "request";
import {Mapper} from "../../logic/core/Mapper";
import {AuthController} from "../controllers/AuthController";
import {InternalServerError} from "../../logic/core/errors/InternalServerError";
import {InvalidCredentialsError} from "../../logic/repositories/AuthManager";

export class InternalUserRepository implements UserRepository {
    private githubApiPath: string = "https://api.github.com/"

    createUser(user: User): Promise<User> {
        return Promise.reject(new MethodNotImplementedError());
    }

    existsUserWithId(id: string): Promise<boolean> {
        return Promise.reject(new MethodNotImplementedError());
    }

    getUserWithId(id: string): Promise<User> {
        return Promise.reject(new MethodNotImplementedError());
    }

    async getGithubUserFromToken(token: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const uri: string = this.githubApiPath + 'user';
            request.get(AuthController.getBearerAuthHeader(uri, token), function (error: any, response: any, body: any) {
                if (response.statusCode == 200) {
                    resolve(new GithubUserToAppUserMapper().map(JSON.parse(body)));
                } else if (response.statusCode == 401) {
                    reject(new InvalidCredentialsError());
                } else {
                    reject(new InternalServerError());
                }
            });
        })
    }
}

class GithubUserToAppUserMapper implements Mapper<any, User> {
    map(input: any): User {
        let user: User = <User>{};
        try {
            user.id = input['id']
            user.login = input['login'];
            user.avatarImageUrl = input['avatar_url'];
            user.profileLink = input['url'];
            user.description = input['bio'];
            return user;
        } catch {
            throw new Error("Mapping error");
        }
    }
}