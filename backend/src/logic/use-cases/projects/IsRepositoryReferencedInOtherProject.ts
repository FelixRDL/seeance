import {ProjectRepository} from "../../repositories/ProjectRepository";

export function IsRepositoryReferencedInOtherProject(
    req: IsRepositoryReferencedInOtherProjectRequest,
    repo: ProjectRepository
): Promise<boolean> {
    return repo.existsProjectReferencingRepository(req.repoId)
}

export interface IsRepositoryReferencedInOtherProjectRequest {
    repoId: string
}