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

export class ProjectsController {
    private repository: ProjectRepository = new InternalProjectRepository();

    async createProject(req: express.Request, res: express.Response) {
        console.log("YASQUEEN")
        try {
            const token: string = <string>req.headers.authorization;
            const repoProvider: RepoRepository =  new InternalRepositoryProvider(token);
            const project: Project = await CreateProject(
                this.repository,
                repoProvider, <CreateProjectRequest>{
                    project: req.body,
                    courseId: res.locals.courseId
                });
            res.json(project);
        } catch(e) {
            if(e instanceof ProjectAlreadyExistingInCourseError) {
                res.status(400).send("The project you are trying to add already exists on the course");
            } else if(e instanceof CourseNotExistingError) {
                res.status(404).send("The course you are trying to access does not exist right now");
            } else {
                console.error(e);
                res.status(500).send("Internal Server Error");
            }
        }
    }

    async getProjectsForCourse(req: express.Request, res: express.Response)  {
        try {
            const token: string = <string>req.headers.authorization;
            const repoProvider: RepoRepository =  new InternalRepositoryProvider(token);
            const projects: Project[] = await GetProjectsForCourse(this.repository, repoProvider, <GetProjectsForCourseRequest> {
                courseId: res.locals.courseId
            });
            res.json(projects);
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }
}