import * as express from 'express';
import {CourseRepository} from "../../logic/repositories/CourseRepository";
import {InternalCourseRepository} from "../providers/InternalCourseRepository";
import {Course} from "../../logic/entities/Course";
import {CourseAlreadyExistingError, CreateCourse} from "../../logic/use-cases/courses/CreateCourse";
import {GetCoursesForUser} from "../../logic/use-cases/courses/GetCoursesForUser";
import {ProjectRepository} from "../../logic/repositories/ProjectRepository";
import {InternalProjectRepository} from "../providers/InternalProjectRepository";
import {GetProjectsAutocomplete} from "../../logic/use-cases/projects/GetProjetsAutocomplete";
import {Project} from "../../logic/entities/Project";
import {RepoRepository} from "../../logic/repositories/RepoRepository";
import {InternalRepositoryProvider} from "../providers/InternalRepositoryProvider";
import {CreateProject, CreateProjectRequest} from "../../logic/use-cases/projects/CreateProject";
import {ProjectAlreadyExistingInCourseError} from "../../logic/use-cases/courses/AddProjectToCourseById";
import {CourseNotExistingError} from "../../logic/use-cases/courses/GetCourseById";

export class ProjectsController {
    private repository: ProjectRepository = new InternalProjectRepository();

    async getProjectsAutocomplete(req: express.Request, res: express.Response) {
        const token: string = <string>req.headers.authorization;
        try {
            const projects: Project[] = await GetProjectsAutocomplete(token, <string>req.query['q'], this.repository);
            res.send(projects);
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async createProject(req: express.Request, res: express.Response) {
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
}