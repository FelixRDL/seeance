import {Preprocessor} from "../../entities/components/Preprocessor";

export interface PreprocessorRepository {
    createPreprocessor(preprocessorName: string, projectId: string, courseId: string): Promise<Preprocessor>;
}