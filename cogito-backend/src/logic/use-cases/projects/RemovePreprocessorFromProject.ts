import {ProjectRepository} from "../../repositories/ProjectRepository";

export function RemovePreprocessorFromProject(
    req: RemovePreprocessorFromProjectRequest,
    repo: ProjectRepository
): Promise<void> {
    return repo.removePreprocessorFromProject(
        req.projectId,
        req.courseId,
        req.preprocessorId
    )
}

export interface RemovePreprocessorFromProjectRequest {
    projectId: string,
    courseId: string,
    preprocessorId: string
}