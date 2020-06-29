// @ts-ignore
import * as express from 'express';
import {ProjectsController} from "../../../../implementation/controllers/ProjectsController";

const router = express.Router();
const controller: ProjectsController = new ProjectsController();

router.get('/', async (req: express.Request, res: express.Response) => {
    await controller.getProjectsForCourse(req, res);
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
    await controller.getProjectById(req, res);
});

router.post('/', async (req: express.Request, res: express.Response) => {
    await controller.createProject(req, res);
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    await controller.removeProjectFromCourse(req, res);
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
    await controller.getProjectById(req, res);
});

router.post('/:id/analyses', async (req: express.Request, res: express.Response) => {
    await controller.addAnalysisToCourse(req, res);
});

export {router};