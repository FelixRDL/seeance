import {PreprocessorTemplate} from "../../entities/components/PreprocessorTemplate";
import {PreprocessorTemplateRepository} from "../../repositories/analysis/PreprocessorTemplateRepository";

export async function GetPreprocessorTemplateByName(req: GetPreprocessorTemplateByNameRequest, repo: PreprocessorTemplateRepository): Promise<PreprocessorTemplate> {
    return repo.getPreprocessorByName(req.nameContains);
}

export interface GetPreprocessorTemplateByNameRequest {
    nameContains: string
}