import {AnalysisViewGenerator} from "../../repositories/analysis/AnalysisViewGenerator";

export function CleanupProject(req: CleanupProjectRequest, repo: AnalysisViewGenerator): Promise<void> {
    return repo.cleanup(req.repoOwner, req.repoName)
}

export interface CleanupProjectRequest {
    repoOwner: string,
    repoName: string
}