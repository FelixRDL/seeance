import {Preprocessor} from "../../entities/components/Preprocessor";

export interface PreprocessorRepository {
    createPreprocessor(preprocessorName: string, projectId: string, courseId: string): Promise<Preprocessor>;
    getPreprocessorsForProject(projectId: string, courseId: string): Promise<Preprocessor[]>;
    setPreprocessorConfig(preprocessorId: string, config: any): Promise<void>;
    getPreprocessorById(preprocessorId: string): Promise<Preprocessor>;
    deleteAnalysis(preprocessorId: string): Promise<void>;
}