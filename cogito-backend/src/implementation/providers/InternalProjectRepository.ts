import {ProjectRepository} from "../../logic/repositories/ProjectRepository";
import {Project} from "../../logic/entities/Project";
import * as request from "request";
import {AuthController} from "../controllers/AuthController";

export class InternalProjectRepository implements ProjectRepository {
    private githubApiPath: string = "https://api.github.com/";
    private static readonly MAX_AUTOCOMPLETE_LENGTH: number = 10;

    async getProjectsByName(token: string, instr: string): Promise<Project[]> {
        const uri: string = this.githubApiPath + "search/repositories?q="+instr;
        return new Promise(async (resolve, reject) => {
            const response = request.get(AuthController.getBearerAuthHeader(uri, token), function (error: any, response: any, body: any) {
                if(error) {
                    reject(error);
                } else {
                    let items = JSON.parse(body).items || [];
                    if(items.length > InternalProjectRepository.MAX_AUTOCOMPLETE_LENGTH) {
                        items = items.slice(0, InternalProjectRepository.MAX_AUTOCOMPLETE_LENGTH);
                    }
                    items = items.map((item: any) => Object.assign({} as Project , item));
                    resolve(items);
                }
            });
        })
    }
}
