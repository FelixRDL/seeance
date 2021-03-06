import * as express from "express";
import {GetAnalysisTemplates} from "../../logic/use-cases/components/GetAnalysisTemplates";
import {GetPreprocessorTemplates} from "../../logic/use-cases/components/GetPreprocessorTemplates";
import {GetDatasourceTemplates} from "../../logic/use-cases/components/GetDatasourceTemplates";
import {AnalysisTemplateRepository} from "../../logic/repositories/analysis/AnalysisTemplateRepository";
import {DatasourceTemplateRepository} from "../../logic/repositories/analysis/DatasourceTemplateRepository";
import {PreprocessorTemplateRepository} from "../../logic/repositories/analysis/PreprocessorTemplateRepository";
import {InternalComponentTemplateProviderAccess} from "../providers/InternalComponentTemplateProvider";
import {GetAnalysisTemplateByName} from "../../logic/use-cases/components/GetAnalysisTemplateByName";
import {GetPreprocessorTemplateByName} from "../../logic/use-cases/components/GetPreprocessorTemplateByName";



export class ComponentController {


    analysisProvider: AnalysisTemplateRepository = InternalComponentTemplateProviderAccess.getInstance() as AnalysisTemplateRepository
    datasourceRepository: DatasourceTemplateRepository = InternalComponentTemplateProviderAccess.getInstance() as DatasourceTemplateRepository
    preprocessorRepository: PreprocessorTemplateRepository = InternalComponentTemplateProviderAccess.getInstance() as PreprocessorTemplateRepository



    async getAnalyses(req: express.Request, res: express.Response) {
        const ans = await GetAnalysisTemplates({
            nameContains: ''
        }, this.analysisProvider)
        res.json(ans)
    }

    async getAnalysisByName(req: express.Request, res: express.Response) {
        const ans = await GetAnalysisTemplateByName(
            req.params.q, this.analysisProvider)
        res.json(ans)
    }

    async getPreprocessors(req: express.Request, res: express.Response) {
        const ans = await GetPreprocessorTemplates({
            nameContains: ''
        }, this.preprocessorRepository)
        res.json(ans)
    }

    async getPreprocessorByName(req: express.Request, res: express.Response) {
        const ans = await GetPreprocessorTemplateByName({
            nameContains: req.params.q
        }, this.preprocessorRepository)
        res.json(ans)
    }

    async getDatasources(req: express.Request, res: express.Response) {
        const ans = await GetDatasourceTemplates({
            nameContains: ''
        }, this.datasourceRepository)
        res.json(ans)
    }
}