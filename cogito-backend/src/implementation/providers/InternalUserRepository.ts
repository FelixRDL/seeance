import {UserRepository} from "../../logic/repositories/UserRepository";
import {User} from "../../logic/entities/User";
import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";
import * as request from "request";
import {Mapper} from "../../logic/core/Mapper";
import {AuthController} from "../controllers/AuthController";
import {InternalServerError} from "../../logic/core/errors/InternalServerError";
import {InvalidCredentialsError} from "../../logic/repositories/AuthManager";
const cached_request = require('cached-request');
const cachedRequest = cached_request(request);
const cacheDirectory = "/tmp/cache";
cachedRequest.setCacheDirectory(cacheDirectory);
// @ts-ignore
import {UserModel} from './../../driver/models/UserModel';

export class InternalUserRepository implements UserRepository {
    private githubApiPath: string = "https://api.github.com/"

    createUser(user: User): Promise<User> {
        const model: any = new UserModel(user);
        // @ts-ignore
        return model.save();
    }

    existsUserWithId(id: string): Promise<boolean> {
        return UserModel.exists({'id': id});
    }

    getUserWithId(id: string): Promise<User> {
        return UserModel.findOne({'id': id});
    }

    async getGithubUserFromToken(token: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const uri: string = this.githubApiPath + 'user';
            let options = AuthController.getBearerAuthHeader(uri, token);
            options.ttl = 10000;
            cachedRequest.get(options, function (error: any, response: any, body: any) {
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