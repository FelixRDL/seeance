import {PreprocessorRepository} from "../../logic/repositories/analysis/PreprocessorRepository";
import {Preprocessor} from "../../logic/entities/components/Preprocessor";
import {PreprocessorModel} from "../../driver/models/PreprocessorModel";

export class InternalPreprocessorRepository implements PreprocessorRepository {
    createPreprocessor(preprocessorName: string, projectId: string, courseId: string): Promise<Preprocessor> {
        return PreprocessorModel.create({
            name: preprocessorName,
            template: preprocessorName,
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

    setPreprocessorConfig(preprocessorId: string, config: any): Promise<void> {
        return PreprocessorModel.update(
            {_id: preprocessorId},
            {
                config: config
            }
        );
    }

    getPreprocessorById(preprocessorId: string): Promise<Preprocessor> {
        return PreprocessorModel.findOne({
            _id: preprocessorId
        });
    }

    deleteAnalysis(preprocessorId: string): Promise<void> {
        return PreprocessorModel.deleteOne({
            _id: preprocessorId
        });
    }
}