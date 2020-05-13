import {ProjectRepository} from "../../repositories/ProjectRepository";
import {Project, ProtoProject} from "../../entities/Project";
import {RepoRepository} from "../../repositories/RepoRepository";
import {
    ProtoProjectToProjectMapper
} from "../../repositories/mappers/ProtoProjectToProjectMapper";

export async function GetProjectById(id: string, projectRepository: ProjectRepository, repoRepository: RepoRepository): Promise<Project> {
    const project: ProtoProject = await projectRepository.getProjectById(id);
    const mapper: ProtoProjectToProjectMapper = new ProtoProjectToProjectMapper(repoRepository);
    return mapper.map(project);
}