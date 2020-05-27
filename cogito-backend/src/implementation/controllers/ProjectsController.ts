import * as express from 'express';
import {ProjectRepository} from "../../logic/repositories/ProjectRepository";
import {InternalProjectRepository} from "../providers/InternalProjectRepository";
import {GetProjectsAutocomplete} from "../../logic/use-cases/projects/GetProjetsAutocomplete";
import {Project} from "../../logic/entities/Project";
import {RepoRepository} from "../../logic/repositories/RepoRepository";
import {InternalRepositoryProvider} from "../providers/InternalRepositoryProvider";
import {CreateProject, CreateProjectRequest} from "../../logic/use-cases/projects/CreateProject";
import {ProjectAlreadyExistingInCourseError} from "../../logic/use-cases/courses/AddProjectToCourseById";
import {CourseNotExistingError} from "../../logic/use-cases/courses/GetCourseById";
import {GetProjectsForCourse, GetProjectsForCourseRequest} from "../../logic/use-cases/projects/GetProjectsForCourse";
import {
    RemoveProjectByIdFromCourse,
    RemoveProjectByIdFromCourseRequest
} from "../../logic/use-cases/projects/RemoveProjectByIdFromCourse";
import {GetProjectById, GetProjectByIdRequest} from "../../logic/use-cases/projects/GetProjectById";

export class ProjectsController {
    private repository: ProjectRepository = new InternalProjectRepository();

    async createProject(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const repoProvider: RepoRepository = new InternalRepositoryProvider(token);
            const project: Project = await CreateProject(
                this.repository,
                repoProvider, <CreateProjectRequest>{
                    project: req.body,
                    courseId: res.locals.courseId
                });
            res.json(project);
        } catch (e) {
            if (e instanceof ProjectAlreadyExistingInCourseError) {
                res.status(400).send("The project you are trying to add already exists on the course");
            } else if (e instanceof CourseNotExistingError) {
                res.status(404).send("The course you are trying to access does not exist right now");
            } else {
                console.error(e);
                res.status(500).send("Internal Server Error");
            }
        }
    }

    async getProjectsForCourse(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const repoProvider: RepoRepository = new InternalRepositoryProvider(token);
            const projects: Project[] = await GetProjectsForCourse(this.repository, repoProvider, <GetProjectsForCourseRequest>{
                courseId: res.locals.courseId
            });
            res.json(projects);
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async getProjectById(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            const repoProvider: RepoRepository = new InternalRepositoryProvider(token);
            const project: Project = await GetProjectById(<GetProjectByIdRequest>{
                id: req.params.id
            }, this.repository, repoProvider);
            res.json(project);
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async removeProjectFromCourse(req: express.Request, res: express.Response) {
        try {
            const success: boolean = await RemoveProjectByIdFromCourse(
                this.repository,
                {
                    projectId: req.params.id,
                    courseId: res.locals.courseId
                } as RemoveProjectByIdFromCourseRequest
            );
            if (!success) {
                res.status(404).send("The project to be deleted does not exist");
            } else {
                res.status(200).json({
                    id: req.params.id
                });
            }
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal server error");
        }
    }
}