import {AnalysisTemplate} from "../../entities/analysis/AnalysisTemplate";
import {AnalysisRepository} from "../../repositories/components/AnalysisRepository";

export async function GetAnalyses(req: GetAnalysesRequest, repo: AnalysisRepository): Promise<AnalysisTemplate[]> {
    return repo.getAnalyses(req.nameContains);
}

export interface GetAnalysesRequest {
    nameContains: string
}