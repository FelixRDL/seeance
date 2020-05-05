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
var mongoose = require('mongoose');

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
}