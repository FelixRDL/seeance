import {AnalysisRepository} from "../../repositories/analysis/AnalysisRepository";
import {PreprocessorRepository} from "../../repositories/analysis/PreprocessorRepository";

export function SetPreprocessorConfig(
    req: SetPreprocessorConfigRequest,
    repo: PreprocessorRepository
) {
    return repo.setPreprocessorConfig(req.preprocessorId, req.config)
}

export interface SetPreprocessorConfigRequest {
    preprocessorId: string,
    config: any
}