import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";
import {PreprocessorRepository} from "../../logic/repositories/analysis/PreprocessorRepository";
import {PreprocessorTemplate} from "../../logic/entities/components/PreprocessorTemplate";
import {AnalysisRepository} from "../../logic/repositories/analysis/AnalysisRepository";
import {AnalysisTemplate} from "../../logic/entities/components/AnalysisTemplate";

const ComponentRepository = require('seeance-analysis-core').ComponentProvider

export class InternalComponentProvider implements AnalysisRepository, PreprocessorRepository{

    repository: any;

    constructor() {
        this.repository = ComponentRepository({
            customRepositories: ['felixrdl/seeance-test']
        })
        this.repository.init().then(() => {
            console.log("Component Provider inited")
        })
    }

    getAnalyses(nameContains?: string): Promise<AnalysisTemplate[]> {
        return Promise.resolve(this.repository.listAnalyses().map((item: any) => {
            // TODO: this lambda could be extracted for reuse in "by name" method
            return {
                name: item.package.name,
                description: item.package.description,
                depends_on: item.package.seeance.depends_on,
                configSchema: item.package.seeance.config_schema,
                module: item.module
            } as AnalysisTemplate
        }))
    }

    getAnalysisByName(name: string): Promise<AnalysisTemplate> {
        return Promise.reject(new MethodNotImplementedError());
    }

    getPreprocessorByName(name: string): Promise<PreprocessorTemplate> {
        return Promise.reject(new MethodNotImplementedError());
    }

    getPreprocessors(nameContains?: string): Promise<PreprocessorTemplate[]> {
        return Promise.resolve(this.repository.listPreprocessors().map((item: any) => {
            return {
                name: item.package.name,
                description: item.package.description,
                depends_on: item.package.seeance.depends_on,
                produces: item.package.seeance.produces,
                configSchema: item.package.seeance.config_schema,
                module: item.module
            } as PreprocessorTemplate
        }))
    }

}