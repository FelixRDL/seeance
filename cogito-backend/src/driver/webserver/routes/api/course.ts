// @ts-ignore
import * as express from 'express';
import {CourseController} from "../../../../implementation/controllers/CourseController";
import * as project from './project';

const router = express.Router();
const controller: CourseController = new CourseController();

router.use('/:id/projects', (req, res, next) => {
    res.locals.courseId = req.params.id;
    next();
}, project.router);


router.post('/', async (req: express.Request, res: express.Response) => {
    controller.createCourse(req, res);
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
    controller.getCourseById(req, res);
});

router.get('/', async (req: express.Request, res: express.Response) => {
    controller.listCourses(req, res);
});

export {router};