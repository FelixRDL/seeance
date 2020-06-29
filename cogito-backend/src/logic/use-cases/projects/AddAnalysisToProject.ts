import {ProjectRepository} from "../../repositories/ProjectRepository";

export function AddAnalysisToProject(
    req: AddAnalysisToProjectRequest,
    repo: ProjectRepository
) {
    return repo.addAnalysisToProject(
        req.projectId,
        req.courseId,
        req.analysisId
    )
}

export interface AddAnalysisToProjectRequest {
    projectId: string,
    courseId: string,
    analysisId: string
}