import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";

export interface AnalysisRepository {
    getAnalyses(nameContains?: string): Promise<AnalysisTemplate[]>;
    getAnalysisByName(name: string): Promise<AnalysisTemplate>;
}