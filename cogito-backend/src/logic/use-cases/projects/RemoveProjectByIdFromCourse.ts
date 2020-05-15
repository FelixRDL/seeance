import {ProjectRepository} from "../../repositories/ProjectRepository";

export async function RemoveProjectByIdFromCourse(
    repository: ProjectRepository,
    req: RemoveProjectByIdFromCourseRequest): Promise<boolean> {
    return repository.removeProjectByIdFromCourse(req.projectId, req.courseId);
}

export interface RemoveProjectByIdFromCourseRequest {
    courseId: string;
    projectId: string;
}