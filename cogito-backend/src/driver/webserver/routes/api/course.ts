// @ts-ignore
import * as express from 'express';
import {CourseController} from "../../../../implementation/controllers/CourseController";

const router = express.Router();
const controller: CourseController = new CourseController();
router.post('/', async (req: express.Request, res: express.Response) => {
    controller.createCourse(req, res);
});

export {router};