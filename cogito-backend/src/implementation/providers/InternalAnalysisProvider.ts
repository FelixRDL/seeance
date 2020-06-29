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
}