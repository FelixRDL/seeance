import {ProjectRepository} from "../../repositories/ProjectRepository";

export function RemoveAnalysisFromProject(
    req: RemoveAnalysisFromProjectRequest,
    repo: ProjectRepository
): Promise<void> {
    return repo.removeAnalysisFromProject(
        req.projectId,
        req.courseId,
        req.analysisId
    )
}

export interface RemoveAnalysisFromProjectRequest {
    projectId: string,
    courseId: string,
    analysisId: string
}