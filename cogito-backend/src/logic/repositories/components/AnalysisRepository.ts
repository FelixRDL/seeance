import {AnalysisTemplate} from "../../entities/analysis/AnalysisTemplate";

export interface AnalysisRepository {
    getAnalyses(nameContains?: string): Promise<AnalysisTemplate[]>;
    getAnalysisByName(name: string): Promise<AnalysisTemplate>;
}