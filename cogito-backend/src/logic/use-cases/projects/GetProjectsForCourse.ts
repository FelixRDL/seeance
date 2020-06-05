import {ProjectRepository} from "../../repositories/ProjectRepository";
import {Project, ProtoProject} from "../../entities/Project";
import {RepoRepository} from "../../repositories/RepoRepository";
import {ProtoProjectToProjectMapper} from "../../repositories/mappers/ProtoProjectToProjectMapper";

export async function GetProjectsForCourse(repository: ProjectRepository, repoRepository: RepoRepository, req: GetProjectsForCourseRequest): Promise<Project[]> {
    const protos: ProtoProject[] = await repository.getProjectsForCourse(req.courseId);
    const mapper: ProtoProjectToProjectMapper = new ProtoProjectToProjectMapper(repoRepository);
    const result: Project[] = await Promise.all(
        protos.map(proto => mapper.map(proto))
    );
    return Promise.resolve(result);
}

export interface GetProjectsForCourseRequest {
    courseId: string
}