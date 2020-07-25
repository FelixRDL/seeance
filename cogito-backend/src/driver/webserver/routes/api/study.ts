// @ts-ignore
import * as express from 'express';
import {StudyController} from "../../../../implementation/controllers/StudyController";
const router = express.Router();
const controller: StudyController = new StudyController()

router.post('/registrations/', async(req: express.Request, res: express.Response) => {
    controller.logRegistration(req, res);
});

router.post('/demographies/', async(req: express.Request, res: express.Response) => {
    controller.logDemography(req, res);
});

router.post('/ueq/', async(req: express.Request, res: express.Response) => {
    controller.logUeq(req, res);
});

router.post('/notes/', async(req: express.Request, res: express.Response) => {
    controller.logNotes(req, res);
});

router.post('/uievents/', async(req: express.Request, res:express.Response) => {
    controller.logUiEvent(req, res)
});

router.post('/tasks/:taskId/start/', async(req: express.Request, res:express.Response) => {
    controller.logTaskStart(req, res)
});

router.post('/tasks/:taskId/stop/', async(req: express.Request, res:express.Response) => {
    controller.logTaskStop(req, res)
});

router.post('/systemevents/:eventType/', async(req: express.Request, res:express.Response) => {
    controller.logSystemEvent(req, res)
});


export {router};