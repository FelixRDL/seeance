import {ProjectRepository} from "../../repositories/ProjectRepository";
import {Project} from "../../entities/Project";
import {RepoRepository} from "../../repositories/RepoRepository";
import {Repository} from "../../entities/Repository";

export async function GetRepositoryAutocomplete(token: string, instr: string, repository: RepoRepository): Promise<Repository[]> {
    return repository.getRepositoryAutocomplete(token, instr);
}