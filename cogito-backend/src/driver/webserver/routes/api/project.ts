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

router.get('/:id/analyses', async (req: express.Request, res: express.Response) => {
    await controller.getAnalysesForCourse(req, res);
});

router.get('/:id/analyses/:preprocessorId', async (req: express.Request, res: express.Response) => {
    await controller.getAnalysisById(req, res);
});

router.get('/:id/analyses/:preprocessorId/view', async (req: express.Request, res: express.Response) => {
    await controller.getAnalysisViewForCourse(req, res);
});

router.post('/:id/analyses/:preprocessorId/configure', async (req: express.Request, res: express.Response) => {
    await controller.setConfigurationForAnalysis(req, res);
});

export {router};