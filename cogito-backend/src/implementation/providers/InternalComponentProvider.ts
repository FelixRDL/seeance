import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";
import {PreprocessorRepository} from "../../logic/repositories/analysis/PreprocessorRepository";
import {PreprocessorTemplate} from "../../logic/entities/components/PreprocessorTemplate";
import {AnalysisRepository} from "../../logic/repositories/analysis/AnalysisRepository";
import {AnalysisTemplate} from "../../logic/entities/components/AnalysisTemplate";
import {DatasourceRepository} from "../../logic/repositories/analysis/DatasourceRepository";
import {DatasourceTemplate} from "../../logic/entities/components/DatasourceTemplate";
import {Analysis} from "../../logic/entities/components/Analysis";

import {AnalysisModel} from "../../driver/models/AnalysisModel";

const ComponentRepository = require('seeance-analysis-core').ComponentProvider

export class InternalComponentProvider implements AnalysisRepository, PreprocessorRepository, DatasourceRepository {

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

    getDatasourceByName(name: string): Promise<DatasourceTemplate> {
        return Promise.reject(new MethodNotImplementedError());
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

    createAnalysis(analysisName: string, projectId: string, courseId: string): Promise<Analysis> {
        return AnalysisModel.create({
            name: analysisName,
            analysis: analysisName,
            assignedProject: projectId,
            assignedCourse: courseId,
            config: {}
        });
    }
}