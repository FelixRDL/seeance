import * as express from "express";
import {GitCloneRepository} from "../../logic/repositories/analysis/GitCloneRepository";
import {LocalGitCloneRepository} from "../providers/LocalGitCloneRepository";
import {GetAnalysis} from "../../logic/use-cases/analysis/GetAnalysis";
import {DatasourceRepository} from "../../logic/repositories/analysis/DatasourceRepository";
import {LocalDatasourceRepository} from "../providers/LocalDatasourceRepository";

export class AnalysisController {
    async getAnalysis(req: express.Request, res: express.Response) {
        const token: string = <string>req.headers.authorization;
        const cloneRepo: GitCloneRepository = new LocalGitCloneRepository(token, './../../../tmp');
        const datasourceRepository: DatasourceRepository = new LocalDatasourceRepository();
        await GetAnalysis(
            {
                repoName: "",
                repoOwnerName: "",
                analysis: {
                    template: {
                        process(input: any, config: any): string {
                            console.log(input);
                            return "";
                        },
                        manifest: {
                            dataSources: [],
                            title: "",
                            configTemplate: {},
                            description: ""
                        }
                    },
                    config: undefined,
                    assignedToProjectId: ""
                }
            },
            datasourceRepository,
            cloneRepo);
    }
}