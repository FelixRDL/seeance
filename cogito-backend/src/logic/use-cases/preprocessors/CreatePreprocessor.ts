import {PreprocessorTemplateRepository} from "../../repositories/analysis/PreprocessorTemplateRepository";
import {PreprocessorTemplate} from "../../entities/components/PreprocessorTemplate";
import {PreprocessorRepository} from "../../repositories/analysis/PreprocessorRepository";
import {Preprocessor} from "../../entities/components/Preprocessor";

export async function CreatePreprocessor(req: CreatePreprocessorRequest, repo: PreprocessorRepository, templateRepo: PreprocessorTemplateRepository): Promise<Preprocessor> {
    try {
        const template: PreprocessorTemplate = await templateRepo.getPreprocessorByName(req.template)
        return repo.createPreprocessor(req.template, req.projectId, req.courseId)
    } catch(e) {
        return Promise.reject(new PluginNotFoundError(req.template))
    }
}

export interface CreatePreprocessorRequest {
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