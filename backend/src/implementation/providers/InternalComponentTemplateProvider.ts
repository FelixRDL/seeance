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
            customRepositories: [],
            reloadOnly: false
        })
        this.repository.init().then(() => {
            console.log("Component Provider inited")
        })
    }

    formatTemplate(object: any): AnalysisTemplate {
        const result: AnalysisTemplate = {
            name: object.package.name,
            description: object.package.seeance.description,
            depends_on: object.package.seeance.depends_on,
            configSchema: object.package.seeance.config_schema,
            layout: object.package.seeance.layout || {},
            category: object.package.seeance.category as string,
            module: object.module,
            package: object.package
        }
        return result
    }

    getAnalysisTemplates(nameContains?: string): Promise<AnalysisTemplate[]> {
        return Promise.resolve(this.repository.listAnalyses().map(this.formatTemplate))
    }

    getAnalysisTemplateByName(name: string): Promise<AnalysisTemplate> {
        const template: AnalysisTemplate = this.formatTemplate(this.repository.getAnalysisByName(name))
        return template !== undefined ? Promise.resolve(template) : Promise.reject(new PluginNotFoundError(name))
    }

    getPreprocessorByName(name: string): Promise<PreprocessorTemplate> {
        let template: PreprocessorTemplate = this.repository.getPreprocessorByName(name)
        return template !== undefined ? Promise.resolve(template) : Promise.reject(new PluginNotFoundError(name))
    }

    getPreprocessors(nameContains?: string): Promise<PreprocessorTemplate[]> {
        return Promise.resolve(this.repository.listPreprocessors().map((item: any) => {
            return {
                name: item.package.name,
                description: item.package.seeance.description,
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