import {AnalysisRepository} from "../../repositories/analysis/AnalysisRepository";
import {Analysis} from "../../entities/components/Analysis";

export function CreateAnalysis(req: CreateAnalysisRequest, repo: AnalysisRepository): Promise<Analysis> {
    return repo.createAnalysis(req.template, req.projectId, req.courseId)
}

export interface CreateAnalysisRequest {
    name?: string,
    template: string,
    config?: Object,
    courseId: string,
    projectId: string,
}