import * as express from 'express';
import {CourseRepository} from "../../logic/repositories/CourseRepository";
import {InternalCourseRepository} from "../providers/InternalCourseRepository";
import {Course} from "../../logic/entities/Course";
import {CourseAlreadyExistingError, CreateCourse} from "../../logic/use-cases/courses/CreateCourse";
var mongoose = require('mongoose');

export class CourseController {
    private repository: CourseRepository = new InternalCourseRepository();

    async createCourse(req: express.Request, res: express.Response) {
        try {
            const result: Course = await CreateCourse(req.body, this.repository);
            res.json(result);
        } catch(e) {
            if(e instanceof CourseAlreadyExistingError) {
                res.status(409).send("Course is already existing!");
            } else if (e instanceof  mongoose.Error.ValidationError) {
                res.status(400).send("Invalid course object.")
            }
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }
}