// @ts-ignore
import * as express from 'express';
import {CourseController} from "../../../../implementation/controllers/CourseController";
import {ProjectsController} from "../../../../implementation/controllers/ProjectsController";
import {RepoRepository} from "../../../../logic/repositories/RepoRepository";
import {InternalRepositoryProvider} from "../../../../implementation/providers/InternalRepositoryProvider";
import {RepositoryController} from "../../../../implementation/controllers/RepositoryController";

const router = express.Router();
const controller: RepositoryController = new RepositoryController();
router.get('/', async (req: express.Request, res: express.Response) => {
    await controller.getRepositoriesAutocomplete(req, res);
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
    await controller.getRepositoryById(req, res);
});

export {router};