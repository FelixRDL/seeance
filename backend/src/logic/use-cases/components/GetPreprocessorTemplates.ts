import {PreprocessorTemplate} from "../../entities/components/PreprocessorTemplate";
import {PreprocessorTemplateRepository} from "../../repositories/analysis/PreprocessorTemplateRepository";

export async function GetPreprocessorTemplates(req: GetPreprocessorsRequest, repo: PreprocessorTemplateRepository): Promise<PreprocessorTemplate[]> {
    return repo.getPreprocessors(req.nameContains);
}

export interface GetPreprocessorsRequest {
    nameContains?: string
}