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
import {ProjectRepository} from "../../logic/repositories/ProjectRepository";
import {InternalProjectRepository} from "../providers/InternalProjectRepository";
import {
    IsUserAuthorizedToAccessCourse,
    IsUserAuthorizedToAccessCourseRequest
} from "../../logic/use-cases/courses/IsUserAuthorizedToAccessCourse";
import {DeleteCourseById, DeleteCourseByIdRequest} from "../../logic/use-cases/courses/DeleteCourseById";
import {ExistsUserWithId} from "../../logic/use-cases/user/ExistsUserWithId";
import {ExistsCourseById} from "../../logic/use-cases/courses/ExistsCourseById";

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

    async removeCourseById(req: express.Request, res: express.Response) {
        console.log("ABC");
        try {
            await DeleteCourseById(<DeleteCourseByIdRequest>{
                courseId: req.params.id
            }, this.repository,
                this.projectRepository);
            res.send();
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async checkAuthorizationMw(req: express.Request, res: express.Response, next: any) {
        if(!await IsUserAuthorizedToAccessCourse(<IsUserAuthorizedToAccessCourseRequest>{
            id: req.params.id,
            user: res.locals.authenticatedUser
        }, new InternalCourseRepository())) {
            res.status(401).send("Access forbidden");
        } else {
            next();
        }
    }

    async checkExistingMw(req: express.Request, res: express.Response, next: any) {
        if(!await ExistsCourseById({
            courseId: req.params.id
        }, new InternalCourseRepository())) {
            res.status(404).send("Course not existing");
        } else {
            next();
        }
    }
}