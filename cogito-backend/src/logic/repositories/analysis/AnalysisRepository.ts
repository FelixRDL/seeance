import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";
import {Analysis} from "../../entities/components/Analysis";

export interface AnalysisRepository {
    getAnalysisTemplates(nameContains?: string): Promise<AnalysisTemplate[]>;
    getAnalysisTemplateByName(name: string): Promise<AnalysisTemplate>;
    createAnalysis(analysisName: string, projectId: string, courseId: string): Promise<Analysis>;
}