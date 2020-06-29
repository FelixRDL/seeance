import {AnalysisRepository} from "../../repositories/analysis/AnalysisRepository";
import {Analysis} from "../../entities/components/Analysis";
import {AnalysisTemplateRepository} from "../../repositories/analysis/AnalysisTemplateRepository";
import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";

export async function CreateAnalysis(req: CreateAnalysisRequest, repo: AnalysisRepository, templateRepo: AnalysisTemplateRepository): Promise<Analysis> {
    try {
        const template: AnalysisTemplate = await templateRepo.getAnalysisTemplateByName(req.template)
        return repo.createAnalysis(req.template, req.projectId, req.courseId)
    } catch(e) {
        return Promise.reject(new PluginNotFoundError(req.template))
    }
}

export interface CreateAnalysisRequest {
    name?: string,
    template: string,
    config?: Object,
    courseId: string,
    projectId: string,
}

export class PluginNotFoundError extends Error {
    constructor(pluginName:string) {
        super();
        this.message = `The plugin named ${pluginName} could not be found`;
    }
}