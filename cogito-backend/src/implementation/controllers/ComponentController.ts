import * as express from "express";
import {InternalComponentProvider} from "../providers/InternalComponentProvider";
import {GetAnalyses} from "../../logic/use-cases/components/GetAnalyses";
import {GetPreprocessors} from "../../logic/use-cases/components/GetPreprocessors";

export class ComponentController {

    provider: InternalComponentProvider = new InternalComponentProvider()

    async getAnalyses(req: express.Request, res: express.Response) {
        const ans = await GetAnalyses({
            nameContains: ''
        }, this.provider)
        res.json(ans)
    }

    async getPreprocessors(req: express.Request, res: express.Response) {
        const ans = await GetPreprocessors({
            nameContains: ''
        }, this.provider)
        res.json(ans)
    }
}