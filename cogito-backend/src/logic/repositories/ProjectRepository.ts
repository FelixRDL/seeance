import {User} from "../entities/User";
import {Project} from "../entities/Project";

export interface ProjectRepository {
    getProjectsByName(token: string, instr: string): Promise<Project[]>;
}