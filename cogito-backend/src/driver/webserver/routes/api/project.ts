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

//
// PREPROC. MANAGEMENT
//

router.post('/:id/preprocessors', async (req: express.Request, res: express.Response) => {
    await controller.addPreprocessorToCourse(req, res);
});


//
// ANALYSIS MANAGEMENT
//

router.post('/:id/analyses', async (req: express.Request, res: express.Response) => {
    await controller.addAnalysisToCourse(req, res);
});

router.get('/:id/analyses', async (req: express.Request, res: express.Response) => {
    await controller.getAnalysesForCourse(req, res);
});

router.get('/:id/analyses/:analysisId', async (req: express.Request, res: express.Response) => {
    await controller.getAnalysisById(req, res);
});

router.post('/:id/analyses/:analysisId/configure', async (req: express.Request, res: express.Response) => {
    await controller.setConfigurationForAnalysis(req, res);
});

//
// ANALYSIS EXEC
//

router.get('/:id/analyses/:analysisId/view', async (req: express.Request, res: express.Response) => {
    await controller.getAnalysisViewForCourse(req, res);
});

export {router};