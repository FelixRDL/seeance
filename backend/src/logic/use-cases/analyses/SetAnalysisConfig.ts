import {AnalysisRepository} from "../../repositories/analysis/AnalysisRepository";

export function SetAnalysisConfig(
    req: SetAnalysisConfigRequest,
    repo: AnalysisRepository
) {
    return repo.setAnalysisConfig(req.analysisId, req.config)
}

export interface SetAnalysisConfigRequest {
    analysisId: string,
    config: any
}