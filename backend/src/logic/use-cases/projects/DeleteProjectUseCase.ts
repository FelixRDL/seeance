import {ProjectRepository} from "../../repositories/ProjectRepository";

export async function DeleteProjectUseCase(
    repository: ProjectRepository,
    req: DeleteProjectUseCaseRequest): Promise<boolean> {
    return repository.deleteProjectById(req.projectId, req.courseId);
}

export interface DeleteProjectUseCaseRequest {
    courseId: string;
    projectId: string;
}