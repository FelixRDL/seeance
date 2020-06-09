import * as express from "express";
import {GitCloneRepository} from "../../logic/repositories/analysis/GitCloneRepository";
import {LocalGitCloneRepository} from "../providers/LocalGitCloneRepository";
import {GetAnalysis} from "../../logic/use-cases/analysis/GetAnalysis";
import {DatasourceRepository} from "../../logic/repositories/analysis/DatasourceRepository";
import {LocalDatasourceRepository} from "../providers/LocalDatasourceRepository";
import {Project} from "../../logic/entities/Project";
import {GetProjectById} from "../../logic/use-cases/projects/GetProjectById";
import {InternalProjectRepository} from "../providers/InternalProjectRepository";
import {InternalRepositoryProvider} from "../providers/InternalRepositoryProvider";

export class AnalysisController {
    async getAnalysis(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const cloneRepo: GitCloneRepository = new LocalGitCloneRepository(token, './../../tmp');
            const datasourceRepository: DatasourceRepository = new LocalDatasourceRepository();
            const project: Project = await GetProjectById({
                id: res.locals.projectId
            }, new InternalProjectRepository(), new InternalRepositoryProvider(
                token
            ));

            let result: string = await GetAnalysis(
                {
                    repoName: project.repository.name,
                    repoOwnerName: project.repository.owner.login,
                    analysis: {
                        template: {
                            process(input: any, config: any): string {
                                console.log(input);
                                return input;
                            },
                            manifest: {
                                dataSources: ["commits", "users", "issues", "milestones"],
                                title: "",
                                configTemplate: {},
                                description: ""
                            }
                        },
                        config: undefined,
                        assignedToProjectId: ""
                    },
                    token: token
                },
                datasourceRepository,
                cloneRepo);
            res.json({
                result: result
            });
        } catch (e) {
            console.error(e);
        }
    }
}