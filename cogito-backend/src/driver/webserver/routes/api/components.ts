import * as express from "express";
import * as project from "./project";
import {ComponentController} from "../../../../implementation/controllers/ComponentController";

const router = express.Router();
const controller: ComponentController = new ComponentController();

router.use('/analyses/',
    (req, res) => {
        controller.getAnalyses(req, res)
    });

router.use('/preprocessors/',
    (req, res) => {
        controller.getPreprocessors(req, res)
    });

router.use('/datasources/',
    (req, res) => {
        controller.getDatasources(req, res)
    });

export {router}