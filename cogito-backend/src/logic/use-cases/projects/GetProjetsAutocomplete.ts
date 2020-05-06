import {ProjectRepository} from "../../repositories/ProjectRepository";
import {Project} from "../../entities/Project";

export async function GetProjectsAutocomplete(token: string, instr: string, repository: ProjectRepository): Promise<Project[]> {
    return repository.getProjectsByName(token, instr);
}