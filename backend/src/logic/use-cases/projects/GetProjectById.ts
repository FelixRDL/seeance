import {ProjectRepository} from "../../repositories/ProjectRepository";
import {Project, ProtoProject} from "../../entities/Project";
import {RepoRepository} from "../../repositories/RepoRepository";
import {
    ProtoProjectToProjectMapper
} from "../../repositories/mappers/ProtoProjectToProjectMapper";

export async function GetProjectById(req: GetProjectByIdRequest, projectRepository: ProjectRepository, repoRepository: RepoRepository): Promise<Project> {
    const project: ProtoProject = await projectRepository.getProjectById(req.id);
    const mapper: ProtoProjectToProjectMapper = new ProtoProjectToProjectMapper(repoRepository);
    return mapper.map(project);
}

export interface GetProjectByIdRequest {
    id: string;
}