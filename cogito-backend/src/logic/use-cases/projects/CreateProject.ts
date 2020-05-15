import {ProjectRepository} from "../../repositories/ProjectRepository";
import {Project, ProtoProject} from "../../entities/Project";
import {ProtoProjectToProjectMapper} from "../../repositories/mappers/ProtoProjectToProjectMapper";
import {RepoRepository} from "../../repositories/RepoRepository";

export async function CreateProject(
    repository: ProjectRepository,
    repoRepository: RepoRepository,
    req: CreateProjectRequest): Promise<Project> {
    req.project.courseId = req.courseId;
    const proto: ProtoProject = await repository.createProject(req.project);
    const mapper: ProtoProjectToProjectMapper = new ProtoProjectToProjectMapper(repoRepository);
    return mapper.map(proto);
}

export interface CreateProjectRequest {
    courseId: string;
    project: Project;
}