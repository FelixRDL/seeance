import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";
import {PreprocessorTemplateRepository} from "../../logic/repositories/analysis/PreprocessorTemplateRepository";
import {PreprocessorTemplate} from "../../logic/entities/components/PreprocessorTemplate";
import {AnalysisTemplateRepository} from "../../logic/repositories/analysis/AnalysisTemplateRepository";
import {AnalysisTemplate} from "../../logic/entities/components/AnalysisTemplate";
import {DatasourceTemplateRepository} from "../../logic/repositories/analysis/DatasourceTemplateRepository";
import {DatasourceTemplate} from "../../logic/entities/components/DatasourceTemplate";
import {PluginNotFoundError} from "../../logic/use-cases/analyses/CreateAnalysis";
const ComponentRepository = require('seeance-analysis-core').ComponentProvider

class InternalComponentTemplateProvider implements AnalysisTemplateRepository, PreprocessorTemplateRepository, DatasourceTemplateRepository {

    repository: any;

    constructor() {
        this.repository = ComponentRepository({
            customRepositories: ['felixrdl/seeance-test']
        })
        this.repository.init().then(() => {
            console.log("Component Provider inited")
        })
    }

    getAnalysisTemplates(nameContains?: string): Promise<AnalysisTemplate[]> {
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

    getAnalysisTemplateByName(name: string): Promise<AnalysisTemplate> {
        const template: AnalysisTemplate = this.repository.getAnalysisByName(name)
        return template !== undefined ? Promise.resolve(template) : Promise.reject(new PluginNotFoundError(name))
    }

    getPreprocessorByName(name: string): Promise<PreprocessorTemplate> {
        const template: PreprocessorTemplate = this.repository.getPreprocessorByName(name)
        return template !== undefined ? Promise.resolve(template) : Promise.reject(new PluginNotFoundError(name))
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

    getDatasourceByName(name: string): Promise<DatasourceTemplate> {
        const template: AnalysisTemplate = this.repository.getDatasourceByName(name)
        return template !== undefined ? Promise.resolve(template) : Promise.reject(new PluginNotFoundError(name))
    }

    getDatasources(nameContains?: string): Promise<DatasourceTemplate[]> {
        return Promise.resolve(this.repository.listDatasources().map((item: any) => {
            return {
                name: item.package.name,
                description: item.package.description,
                module: item.module
            } as PreprocessorTemplate
        }))
    }
}

export abstract class InternalComponentTemplateProviderAccess {

    public static instance: InternalComponentTemplateProvider = new InternalComponentTemplateProvider();

    public static getInstance(): InternalComponentTemplateProvider {
        return InternalComponentTemplateProviderAccess.instance
    }
}