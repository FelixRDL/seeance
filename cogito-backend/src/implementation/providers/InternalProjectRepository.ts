import {ProjectRepository} from "../../logic/repositories/ProjectRepository";
import {Project, ProtoProject} from "../../logic/entities/Project";
import * as request from "request";
import {AuthController} from "../controllers/AuthController";
import {ProjectModel} from "../../driver/models/ProjectModel";
import {Course} from "../../logic/entities/Course";
import {CourseModel} from "../../driver/models/CourseModel";

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
        return ProjectModel.findOne({_id: id});
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

    deleteProjectById(projectId: string, courseId: string): Promise<boolean> {
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

    addAnalysisToProject(projectId: string, courseId: string, analysisId: string): Promise<string[]> {
        return ProjectModel.updateOne(
            {
                _id: projectId,
                courseId: courseId
            },
            {
                $push: {'analysisIds': analysisId}
            }).then(async () => {
            let project = await ProjectModel.findOne({_id: projectId});
            return Promise.resolve(project.analysisIds);
        });
    }

    addPreprocessorToProject(projectId: string, courseId: string, preprocessorId: string): Promise<string[]> {
        return ProjectModel.updateOne(
            {
                _id: projectId,
                courseId: courseId
            },
            {
                $push: {'preprocessorIds': preprocessorId}
            }).then(async () => {
            let project = await ProjectModel.findOne({_id: projectId});
            return Promise.resolve(project.analysisIds);
        });
    }

    removeAnalysisFromProject(projectId: string, courseId: string, analysisId: string): Promise<void> {
        return ProjectModel.update(
            {
                _id: projectId,
                courseId: courseId
            },
            {$pull: {analysisIds: analysisId}}
        );
    }
    removePreprocessorFromProject(projectId: string, courseId: string, preprocessorId: string): Promise<void> {
        return ProjectModel.update(
            {
                _id: projectId,
                courseId: courseId
            },
            {$pull: {preprocessorIds: preprocessorId}}
        );
    }

    existsProjectReferencingRepository(repoId: string): Promise<boolean> {
        return ProjectModel.exists({
            repositoryId: repoId
        })
    }
}