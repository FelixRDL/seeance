import {AnalysisTemplateRepository} from "../../repositories/analysis/AnalysisTemplateRepository";
import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";

export async function GetAnalysisTemplates(req: GetAnalysesRequest, repo: AnalysisTemplateRepository): Promise<AnalysisTemplate[]> {
    return repo.getAnalysisTemplates(req.nameContains);
}

export interface GetAnalysesRequest {
    nameContains: string
}