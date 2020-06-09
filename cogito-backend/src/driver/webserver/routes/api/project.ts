// @ts-ignore
import * as express from 'express';
import * as analysis from './analysis';
import {ProjectsController} from "../../../../implementation/controllers/ProjectsController";
const router = express.Router();
const controller: ProjectsController = new ProjectsController();


router.use('/:id/analyses',
    // TODO: existence + auth checking?
    (req, res, next) => {
        res.locals.projectId = req.params.id;
        next();
    }, analysis.router);

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

export {router};