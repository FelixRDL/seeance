import {RepoRepository} from "../../logic/repositories/RepoRepository";
import {Repository} from "../../logic/entities/Repository";
import * as request from "request";
import {AuthController} from "../controllers/AuthController";

export class InternalRepositoryProvider implements RepoRepository {
    private githubApiPath: string = "https://api.github.com/";
    private static readonly MAX_AUTOCOMPLETE_LENGTH: number = 10;

    getRepositoryAutocomplete(token: string, instr: string): Promise<Repository[]> {
        const uri: string = this.githubApiPath + "search/repositories?q="+instr;
        return new Promise(async (resolve, reject) => {
            const response = request.get(AuthController.getBearerAuthHeader(uri, token), function (error: any, response: any, body: any) {
                if(error) {
                    reject(error);
                } else {
                    let items = JSON.parse(body).items || [];
                    if(items.length > InternalRepositoryProvider.MAX_AUTOCOMPLETE_LENGTH) {
                        items = items.slice(0, InternalRepositoryProvider.MAX_AUTOCOMPLETE_LENGTH);
                    }
                    items = items.map((item: any) => Object.assign({} as Repository , item));
                    resolve(items);
                }
            });
        });
    }

    getRepositoryById(token: string, id: string): Promise<Repository> {
        const uri: string = this.githubApiPath +"repositories/" + id;
        return new Promise(async(resolve, reject) => {
            request.get(AuthController.getBearerAuthHeader(uri, token), (err: any, response: any, body: any) => {
                if(err) {
                    reject(err)
                } else {
                    const result: Repository = JSON.parse(body);
                    resolve(result);
                }
            });
        });
    }
}