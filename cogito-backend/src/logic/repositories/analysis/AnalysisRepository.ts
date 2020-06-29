import {Analysis} from "../../entities/components/Analysis";

export interface AnalysisRepository {
    createAnalysis(analysisName: string, projectId: string, courseId: string): Promise<Analysis>;
    getAnalysesForProject(courseId: string, projectId: string): Promise<Analysis[]>;
}