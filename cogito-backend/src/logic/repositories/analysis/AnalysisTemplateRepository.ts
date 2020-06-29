import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";
import {Analysis} from "../../entities/components/Analysis";

export interface AnalysisTemplateRepository {
    getAnalysisTemplates(nameContains?: string): Promise<AnalysisTemplate[]>;
    getAnalysisTemplateByName(name: string): Promise<AnalysisTemplate>;
}