import {ProjectRepository} from "../../repositories/ProjectRepository";
import {Project} from "../../entities/Project";
import {RepoRepository} from "../../repositories/RepoRepository";
import {Repository} from "../../entities/Repository";

export async function GetRepositoryById(token: string, id: string, repository: RepoRepository): Promise<Repository> {
    return repository.getRepositoryById(token, id);
}