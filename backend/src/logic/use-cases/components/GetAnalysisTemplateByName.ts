import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";
import {AnalysisTemplateRepository} from "../../repositories/analysis/AnalysisTemplateRepository";

export async function GetAnalysisTemplateByName(name: string, repo: AnalysisTemplateRepository): Promise<AnalysisTemplate> {
    return repo.getAnalysisTemplateByName(name)
}