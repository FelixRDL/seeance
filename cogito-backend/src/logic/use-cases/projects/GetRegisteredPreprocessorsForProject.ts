import {Analysis} from "../../entities/components/Analysis";
import {PreprocessorRepository} from "../../repositories/analysis/PreprocessorRepository";
import {Preprocessor} from "../../entities/components/Preprocessor";

export async function GetRegisteredPreprocessorsForProject (
    req: GetRegisteredPreprocessorsRequest,
    repo: PreprocessorRepository
): Promise<Preprocessor[]> {
    const preprocs: Preprocessor[] = await repo.getPreprocessorsForProject(
        req.courseId,
        req.projectId
    )
    return Promise.resolve(preprocs)
}

export interface GetRegisteredPreprocessorsRequest {
    courseId: string,
    projectId: string
}
