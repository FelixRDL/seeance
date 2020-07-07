import {Analysis} from "../../entities/components/Analysis";

export interface AnalysisRepository {
    createAnalysis(analysisName: string, projectId: string, courseId: string): Promise<Analysis>;
    getAnalysesForProject(courseId: string, projectId: string): Promise<Analysis[]>;
    getAnalysisById(id: string): Promise<Analysis>;
    setAnalysisConfig(id: string, config: any): Promise<void>;
}