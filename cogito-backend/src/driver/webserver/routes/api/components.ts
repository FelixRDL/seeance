import * as express from "express";
import * as project from "./project";
import {ComponentController} from "../../../../implementation/controllers/ComponentController";

const router = express.Router();
const controller: ComponentController = new ComponentController();

router.use('/analyses/',
    (req, res) => {
        controller.getAnalyses(req, res)
    });

export {router}