import {Project} from "../entities/Project";
import {Repository} from "../entities/Repository";

export interface RepoRepository {
    getRepositoryAutocomplete(instr: string): Promise<Repository[]>;
    getRepositoryById(id: string): Promise<Repository>;
}