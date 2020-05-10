import * as express from 'express';
import {CourseRepository} from "../../logic/repositories/CourseRepository";
import {InternalCourseRepository} from "../providers/InternalCourseRepository";
import {Course} from "../../logic/entities/Course";
import {CourseAlreadyExistingError, CreateCourse} from "../../logic/use-cases/courses/CreateCourse";
import {GetCoursesForUser} from "../../logic/use-cases/courses/GetCoursesForUser";
import {
    CourseNotExistingError,
    GetCourseById,
    UserNotAuthorizedAccessingCourseError
} from "../../logic/use-cases/courses/GetCourseById";
import {
    AddProjectToCourseById,
    ProjectAlreadyExistingInCourseError
} from "../../logic/use-cases/courses/AddProjectToCourseById";
import {Project} from "../../logic/entities/Project";
import {ProjectRepository} from "../../logic/repositories/ProjectRepository";
import {InternalProjectRepository} from "../providers/InternalProjectRepository";

var mongoose = require('mongoose');

export class CourseController {
    private repository: CourseRepository = new InternalCourseRepository();
    private projectRepository: ProjectRepository = new InternalProjectRepository();

    async createCourse(req: express.Request, res: express.Response) {
        try {
            const result: Course = await CreateCourse(req.body, res.locals.authenticatedUser, this.repository);
            res.json(result);
        } catch (e) {
            if (e instanceof CourseAlreadyExistingError) {
                res.status(409).send("Course is already existing!");
            } else if (e instanceof mongoose.Error.ValidationError) {
                res.status(400).send("Invalid course object.")
            }
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async listCourses(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            let result: Course[] = await GetCoursesForUser(res.locals.authenticatedUser, this.repository);
            // result = await result.map(async (course: Course) => await this.populateProjects(token, course));
            result = await Promise.all(result.map((course: Course) => this.populateProjects(token, course)));
            res.json(result);
        } catch (e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async getCourseById(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            let result: Course = await GetCourseById(req.params.id, res.locals.authenticatedUser, this.repository);
            result = await this.populateProjects(token, result);
            res.json(result);
        } catch (e) {
            if (e instanceof UserNotAuthorizedAccessingCourseError) {
                res.status(401).send("Trying to access unauthorized resource");
            } else if (e instanceof CourseNotExistingError) {
                res.status(404).send("The course you are trying to access is not existing");
            } else {
                console.error(e);
                res.status(500).send("Internal Server Error");
            }

        }
    }

    async addProjectToCourseById(req: express.Request, res: express.Response) {
        try {
            const token: string = <string>req.headers.authorization;
            let result: Course = await AddProjectToCourseById(req.params.id, req.body as Project, this.repository);
            result = await this.populateProjects(token, result);
            res.json(result);
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

    /**
     * TODO: This may be solved more elegantly
     */
    private async populateProjects(token: string, course: Course): Promise<Course> {
        return new Promise(async (resolve, reject) => {
            console.log(course.projects);
            // TODO: this is quite hacky, may remove later
            const projects: Project[] = await Promise.all(course.projects.map(p => this.projectRepository.getProjectById(token, ""+p)));
            let courseCopy: Course =  JSON.parse(JSON.stringify(course)) as Course;
            courseCopy.projects = projects;
            resolve(courseCopy);
        });
    }
}