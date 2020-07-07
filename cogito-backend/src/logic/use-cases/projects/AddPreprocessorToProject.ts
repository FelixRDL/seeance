import {ProjectRepository} from "../../repositories/ProjectRepository";

export function AddPreprocessorToProject(
    req: AddPreprocessorToProjectRequest,
    repo: ProjectRepository
): Promise<string[]> {
    return repo.addAnalysisToProject(
        req.projectId,
        req.courseId,
        req.preprocessorId
    )
}

export interface AddPreprocessorToProjectRequest {
    projectId: string,
    courseId: string,
    preprocessorId: string
}