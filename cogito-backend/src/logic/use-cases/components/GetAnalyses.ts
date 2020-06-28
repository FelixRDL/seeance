import {AnalysisRepository} from "../../repositories/analysis/AnalysisRepository";
import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";

export async function GetAnalyses(req: GetAnalysesRequest, repo: AnalysisRepository): Promise<AnalysisTemplate[]> {
    return repo.getAnalyses(req.nameContains);
}

export interface GetAnalysesRequest {
    nameContains: string
}