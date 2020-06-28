import {PreprocessorTemplate} from "../../entities/components/PreprocessorTemplate";

export interface PreprocessorRepository {
    getPreprocessors(nameContains?: string): Promise<PreprocessorTemplate[]>;
    getPreprocessorByName(name: string): Promise<PreprocessorTemplate>;
}