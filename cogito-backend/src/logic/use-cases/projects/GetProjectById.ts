import {ProjectRepository} from "../../repositories/ProjectRepository";
import {Project} from "../../entities/Project";
import {RepoRepository} from "../../repositories/RepoRepository";
import {MethodNotImplementedError} from "../../core/errors/MethodNotImplementedError";

export async function GetProjectById(token: string, id: string, repository: ProjectRepository, repoRepository: RepoRepository): Promise<Project> {
    return Promise.reject(new MethodNotImplementedError());
}