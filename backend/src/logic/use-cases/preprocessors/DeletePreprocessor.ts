import {AnalysisRepository} from "../../repositories/analysis/AnalysisRepository";
import {PreprocessorRepository} from "../../repositories/analysis/PreprocessorRepository";

export function DeletePreprocessor(analysisId: string, repo: PreprocessorRepository): Promise<void> {
    return repo.deleteAnalysis(analysisId)
}