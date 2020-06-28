import {PreprocessorTemplate} from "../../entities/components/PreprocessorTemplate";
import {PreprocessorRepository} from "../../repositories/analysis/PreprocessorRepository";

export async function GetPreprocessors(req: GetPreprocessorsRequest, repo: PreprocessorRepository): Promise<PreprocessorTemplate[]> {
    return repo.getPreprocessors(req.nameContains);
}

export interface GetPreprocessorsRequest {
    nameContains?: string
}