// @ts-ignore
import * as express from 'express';
import {CourseController} from "../../../../implementation/controllers/CourseController";
import {ProjectsController} from "../../../../implementation/controllers/ProjectsController";

const router = express.Router();
const controller: ProjectsController = new ProjectsController();
router.get('/', async (req: express.Request, res: express.Response) => {
    await controller.getProjectsAutocomplete(req, res);
});

export {router};