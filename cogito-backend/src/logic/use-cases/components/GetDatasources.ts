import {AnalysisRepository} from "../../repositories/analysis/AnalysisRepository";
import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";
import {DatasourceRepository} from "../../repositories/analysis/DatasourceRepository";
import {DatasourceTemplate} from "../../entities/components/DatasourceTemplate";

export async function GetDatasources(req: GetDatasourcesRequest, repo: DatasourceRepository): Promise<DatasourceTemplate[]> {
    return repo.getDatasources(req.nameContains);
}

export interface GetDatasourcesRequest {
    nameContains: string
}