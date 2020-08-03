import {AnalysisTemplateRepository} from "../../repositories/analysis/AnalysisTemplateRepository";
import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";
import {DatasourceTemplateRepository} from "../../repositories/analysis/DatasourceTemplateRepository";
import {DatasourceTemplate} from "../../entities/components/DatasourceTemplate";

export async function GetDatasourceTemplates(req: GetDatasourcesRequest, repo: DatasourceTemplateRepository): Promise<DatasourceTemplate[]> {
    return repo.getDatasources(req.nameContains);
}

export interface GetDatasourcesRequest {
    nameContains: string
}