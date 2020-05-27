import {UserRepository} from "../../logic/repositories/UserRepository";
import {User} from "../../logic/entities/User";
import {Mapper} from "../../logic/core/Mapper";
import {AuthController} from "../controllers/AuthController";
import {InternalServerError} from "../../logic/core/errors/InternalServerError";
import {InvalidCredentialsError} from "../../logic/repositories/AuthManager";

const cached_request = require('cached-request');
const cachedRequest = cached_request(require('request'));
const cacheDirectory = "/tmp/cache";
cachedRequest.setCacheDirectory(cacheDirectory);
// @ts-ignore
import {UserModel} from './../../driver/models/UserModel';
import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";

export class InternalUserRepository implements UserRepository {
    private githubApiPath: string = "https://api.github.com/"
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    createUser(user: User): Promise<User> {
        const model: any = new UserModel({
            githubId: user.id
        });
        // @ts-ignore
        return model.save();
    }

    existsUserWithId(id: string): Promise<boolean> {
        return UserModel.exists({'githubId': id});
    }

    async getUserWithId(id: string): Promise<User> {
        return UserModel.findOne({'githubId': id}).then((protoUser: any) => {
            if (!protoUser)
                return Promise.resolve(undefined);
            else
                return this.getGithubUserById(protoUser.githubId, this.token);
        });
    }

    private async getGithubUserById(id: string, token: string): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            const uri: string = this.githubApiPath + 'user/' +id;
            let options = AuthController.getBearerAuthHeader(uri, token);
            options.ttl = 100000;
            cachedRequest.get(options, (er: any, res: any, body: any) => {
                const user: User = new GithubUserToAppUserMapper().map(JSON.parse(body));
                resolve(user);
            });
        });
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

    async getUserAutocomplete(q: string): Promise<User[]> {
        return new Promise<User[]>(async (resolve, reject) => {
            const uri: string = this.githubApiPath + 'search/users?q=' + q;
            let options = AuthController.getBearerAuthHeader(uri, this.token);
            options.ttl = 10000;
            const userIds: string[] = (await UserModel.find({})).map((result: any) => result.githubId);
            cachedRequest.get(options, (err: any, res: any, body: any) => {
                if(err) {
                    reject(err);
                } else {
                    let foundUsers = JSON.parse(body).items;
                    foundUsers = foundUsers.map((item: any) => new GithubUserToAppUserMapper().map(item));
                    foundUsers = foundUsers.filter((item: User) => userIds.includes(item.id.toString()));
                    resolve(foundUsers);
                }
            });
        });
    }

    async deleteByUserId(userId: string): Promise<void> {
        return UserModel.findOne({githubId: userId}).remove().exec();
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
        } catch (e) {
            console.error(e);
            throw new Error("Mapping error");
        }
    }
}