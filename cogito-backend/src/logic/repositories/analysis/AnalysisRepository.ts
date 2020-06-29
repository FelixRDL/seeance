import {Analysis} from "../../entities/components/Analysis";

export interface AnalysisRepository {
    createAnalysis(analysisName: string, projectId: string, courseId: string): Promise<Analysis>;
}