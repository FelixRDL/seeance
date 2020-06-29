import {AnalysisRepository} from "../../repositories/analysis/AnalysisRepository";
import {Analysis} from "../../entities/components/Analysis";

export async function GetRegisteredAnalysesForProject (
    req: GetRegisteredAnalysesRequest,
    repo: AnalysisRepository
): Promise<Analysis[]> {
    const analyses: Analysis[] = await repo.getAnalysesForProject(
        req.courseId,
        req.projectId
    )
    return Promise.resolve(analyses)
}

export interface GetRegisteredAnalysesRequest {
    courseId: string,
    projectId: string
}
