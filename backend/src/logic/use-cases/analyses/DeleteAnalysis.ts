import {AnalysisRepository} from "../../repositories/analysis/AnalysisRepository";

export function DeleteAnalysis(analysisId: string, repo: AnalysisRepository): Promise<void> {
    return repo.deleteAnalysis(analysisId)
}