import * as express from "express";
import {InternalComponentProvider} from "../providers/InternalComponentProvider";
import {GetAnalyses} from "../../logic/use-cases/components/GetAnalyses";
import {GetPreprocessors} from "../../logic/use-cases/components/GetPreprocessors";
import {GetDatasources} from "../../logic/use-cases/components/GetDatasources";
import {AnalysisRepository} from "../../logic/repositories/analysis/AnalysisRepository";
import {DatasourceRepository} from "../../logic/repositories/analysis/DatasourceRepository";
import {PreprocessorRepository} from "../../logic/repositories/analysis/PreprocessorRepository";

export class ComponentController {

    provider: InternalComponentProvider = new InternalComponentProvider()

    analysisProvider: AnalysisRepository = this.provider as AnalysisRepository
    datasourceRepository: DatasourceRepository = this.provider as DatasourceRepository
    preprocessorRepository: PreprocessorRepository = this.provider as PreprocessorRepository



    async getAnalyses(req: express.Request, res: express.Response) {
        const ans = await GetAnalyses({
            nameContains: ''
        }, this.analysisProvider)
        res.json(ans)
    }

    async getPreprocessors(req: express.Request, res: express.Response) {
        const ans = await GetPreprocessors({
            nameContains: ''
        }, this.preprocessorRepository)
        res.json(ans)
    }

    async getDatasources(req: express.Request, res: express.Response) {
        const ans = await GetDatasources({
            nameContains: ''
        }, this.datasourceRepository)
        res.json(ans)
    }
}