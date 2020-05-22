import {ProjectRepository} from "../../logic/repositories/ProjectRepository";
import {Project, ProtoProject} from "../../logic/entities/Project";
import * as request from "request";
import {AuthController} from "../controllers/AuthController";
import {ProjectModel} from "../../driver/models/ProjectModel";

export class InternalProjectRepository implements ProjectRepository {
    private githubApiPath: string = "https://api.github.com/";
    private static readonly MAX_AUTOCOMPLETE_LENGTH: number = 10;

    // TODO legacy
    async getProjectsByName(token: string, instr: string): Promise<Project[]> {
        const uri: string = this.githubApiPath + "search/repositories?q=" + instr;
        return new Promise(async (resolve, reject) => {
            const response = request.get(AuthController.getBearerAuthHeader(uri, token), function (error: any, response: any, body: any) {
                if (error) {
                    reject(error);
                } else {
                    let items = JSON.parse(body).items || [];
                    if (items.length > InternalProjectRepository.MAX_AUTOCOMPLETE_LENGTH) {
                        items = items.slice(0, InternalProjectRepository.MAX_AUTOCOMPLETE_LENGTH);
                    }
                    items = items.map((item: any) => Object.assign({} as Project, item));
                    resolve(items);
                }
            });
        });
    }

    getProjectById(id: string): Promise<ProtoProject> {
        return ProjectModel.findById(id);
    }

    createProject(project: Project): Promise<ProtoProject> {
        return ProjectModel.create(<ProtoProject>{
            repositoryId: project.repository.id,
            courseId: project.courseId
        });
    }

    getProjectsForCourse(courseId: string): Promise<ProtoProject[]> {
        return ProjectModel.find({courseId: courseId});
    }

    removeProjectByIdFromCourse(projectId: string, courseId: string): Promise<boolean> {
        return ProjectModel.deleteOne({
            $and: [
                {
                    _id: projectId
                }, {
                    courseId: courseId
                }
            ]
        }).then((result: any) => {
            return Promise.resolve(result.deletedCount == 1);
        });
    }

    removeAllProjectsForCourse(courseId: string): Promise<void> {
        return ProjectModel.find({courseId: courseId}).remove().exec();
    }
}