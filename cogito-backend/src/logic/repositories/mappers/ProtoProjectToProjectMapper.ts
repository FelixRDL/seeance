import {ProtoProject} from "../../entities/Project";
import {RepoRepository} from "../RepoRepository";
import {MethodNotImplementedError} from "../../core/errors/MethodNotImplementedError";

export function mapProtoProjectToProject(proto: ProtoProject, repositoryProvider: RepoRepository): Promise<ProtoProject> {
    return Promise.reject(new MethodNotImplementedError());// repositoryProvider.getRepositoryById()
}