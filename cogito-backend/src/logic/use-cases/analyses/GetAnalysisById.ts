import {InternalAnalysisProvider} from "../../../implementation/providers/InternalAnalysisProvider";
import {AnalysisRepository} from "../../repositories/analysis/AnalysisRepository";
import {Analysis} from "../../entities/components/Analysis";

export function GetAnalysisById(analysisId: string, repo: AnalysisRepository): Promise<Analysis> {
    return repo.getAnalysisById(analysisId)
}