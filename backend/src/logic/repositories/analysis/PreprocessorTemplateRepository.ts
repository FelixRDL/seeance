import {PreprocessorTemplate} from "../../entities/components/PreprocessorTemplate";

export interface PreprocessorTemplateRepository {
    getPreprocessors(nameContains?: string): Promise<PreprocessorTemplate[]>;
    getPreprocessorByName(name: string): Promise<PreprocessorTemplate>;
}