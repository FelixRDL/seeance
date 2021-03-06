import {Analysis} from "../../logic/entities/components/Analysis";
import {AnalysisModel} from "../../driver/models/AnalysisModel";
import {AnalysisRepository} from "../../logic/repositories/analysis/AnalysisRepository";

export class InternalAnalysisProvider implements AnalysisRepository {
    createAnalysis(analysisName: string, projectId: string, courseId: string): Promise<Analysis> {
        return AnalysisModel.create({
            name: analysisName,
            analysis: analysisName,
            assignedProject: projectId,
            assignedCourse: courseId,
            config: {}
        });
    }

    getAnalysesForProject(courseId: string, projectId: string): Promise<Analysis[]> {
        return AnalysisModel.find({
            assignedProject: projectId,
            assignedCourse: courseId
        });
    }

    getAnalysisById(id: string): Promise<Analysis> {
        return AnalysisModel.findOne({
            _id: id
        });
    }

    setAnalysisConfig(id: string, config: any): Promise<any> {
            return AnalysisModel.update(
                {_id: id},
                {
                    config: config
                }
            );
        }

    deleteAnalysis(id: string): Promise<void> {
        return AnalysisModel.deleteOne({
            _id: id
        });
    }
}