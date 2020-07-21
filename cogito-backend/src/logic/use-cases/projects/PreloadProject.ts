import {AnalysisViewGenerator} from "../../repositories/analysis/AnalysisViewGenerator";

export function PreloadProject(req: PreloadProjectRequest, repo: AnalysisViewGenerator): Promise<void> {
    return repo.preload(req.ownerName, req.repositoryName, req.token)
}


export interface PreloadProjectRequest {
    repositoryName: string,
    ownerName: string,
    token?: string
}