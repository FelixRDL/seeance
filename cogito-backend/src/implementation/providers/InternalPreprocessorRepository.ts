import {PreprocessorRepository} from "../../logic/repositories/analysis/PreprocessorRepository";
import {Preprocessor} from "../../logic/entities/components/Preprocessor";
import {PreprocessorModel} from "../../driver/models/PreprocessorModel";

export class InternalPreprocessorRepository implements PreprocessorRepository {
    createPreprocessor(preprocessorName: string, projectId: string, courseId: string): Promise<Preprocessor> {
        return PreprocessorModel.create({
            name: preprocessorName,
            analysis: preprocessorName,
            assignedProject: projectId,
            assignedCourse: courseId,
            config: {}
        });
    }

    getPreprocessorsForProject(projectId: string, courseId: string): Promise<Preprocessor[]> {
        return PreprocessorModel.find({
            assignedProject: projectId,
            assignedCourse: courseId
        });
    }
}