import {PreprocessorRepository} from "../../repositories/analysis/PreprocessorRepository";
import {Preprocessor} from "../../entities/components/Preprocessor";

export function GetPreprocessorById(preprocessorById: string, repo: PreprocessorRepository): Promise<Preprocessor> {
    return repo.getPreprocessorById(preprocessorById)
}