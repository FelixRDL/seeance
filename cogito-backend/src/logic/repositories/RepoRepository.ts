import {Project} from "../entities/Project";
import {Repository} from "../entities/Repository";

export interface RepoRepository {
    getRepositoryAutocomplete(token: string, instr: string): Promise<Repository[]>;
    getRepositoryById(token: string, id: string): Promise<Repository>;
}