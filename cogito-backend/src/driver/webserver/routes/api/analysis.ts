import * as express from 'express';
import {AnalysisController} from "../../../../implementation/controllers/AnalysisController";
const router = express.Router();
const controller: AnalysisController = new AnalysisController();

router.get('/:id', async (req: express.Request, res: express.Response) => {
    await controller.getAnalysis(req, res);
});

export {router};