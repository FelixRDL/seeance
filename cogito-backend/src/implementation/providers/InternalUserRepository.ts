import {UserRepository} from "../../logic/repositories/UserRepository";
import {User} from "../../logic/entities/User";
import {Mapper} from "../../logic/core/Mapper";
import {AuthController} from "../controllers/AuthController";
import {InternalServerError} from "../../logic/core/errors/InternalServerError";
import {InvalidCredentialsError} from "../../logic/repositories/AuthManager";

const request = require('request');
const cached_request = require('cached-request');
const cachedRequest = cached_request(require('request'));
const cacheDirectory = "/tmp/cache";
cachedRequest.setCacheDirectory(cacheDirectory);
// @ts-ignore
import {UserModel} from './../../driver/models/UserModel';
import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";
import {Course} from "../../logic/entities/Course";
import {CourseModel} from "../../driver/models/CourseModel";

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
        return UserModel.findOne({'githubId': id}).then(async (protoUser: any) => {
            console.log(protoUser)
            if (!protoUser)
                return Promise.resolve(undefined);
            else {
                let user: User = await this.getGithubUserById(protoUser.githubId, this.token)
                user.visits = protoUser.visits
                return user;
            }
        });
    }

    private async getGithubUserById(id: string, token: string): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            const uri: string = this.githubApiPath + 'user/' + id;
            let options = AuthController.getBearerAuthHeader(uri, token);
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
            request.get(options, function (error: any, response: any, body: any) {
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
                if (err) {
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

    async registerProjectVisit(userId: string, url: string, courseName: string, projectName: string): Promise<void> {
        const user = await UserModel.findOne({githubId: userId})
        let visitIndex = user.visits.map((v: any) => v.url).indexOf(url)
        if (user.visits.length >= 10) {
            await UserModel.updateOne({githubId: userId}, {$pop: {'visits': 1}})
        } else if (visitIndex >= 0) {
            // if there is already an entry of this visited url, slice it away
            user.visits.splice(visitIndex, 1);
            await UserModel.updateOne({githubId: userId}, {$set: {'visits': user.visits}})
        }
        return UserModel.updateOne(
            {githubId: userId},
            {
                $push: {
                    'visits': {
                        url: url,
                        courseName: courseName,
                        projectName: projectName
                    }
                }
            });
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