// @ts-ignore
import * as express from 'express';
import {CourseController} from "../../../../implementation/controllers/CourseController";

const router = express.Router();
const controller: CourseController = new CourseController();
router.post('/', async (req: express.Request, res: express.Response) => {
    controller.createCourse(req, res);
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
    controller.getCourseById(req, res);
});

router.post('/:id/projects', async (req: express.Request, res: express.Response) => {
    controller.addProjectToCourseById(req, res);
});

router.get('/', async (req: express.Request, res: express.Response) => {
    controller.listCourses(req, res);
});

export {router};