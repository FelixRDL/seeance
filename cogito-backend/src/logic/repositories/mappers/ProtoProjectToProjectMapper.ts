import {Project, ProtoProject} from "../../entities/Project";
import {RepoRepository} from "../RepoRepository";
import {Repository} from "../../entities/Repository";
import {Util} from "../../core/Util";

export class ProtoProjectToProjectMapper {
    private repository: RepoRepository;

    constructor(repoRepository: RepoRepository) {
        this.repository = repoRepository;
    }

    async map(proto: ProtoProject): Promise<Project> {
        const repo: Repository = await this.repository.getRepositoryById(proto.repositoryId);
        let result: Project = <Project>Util.clone(proto);
        result.repository = repo;
        return Promise.resolve(result);
    }
}