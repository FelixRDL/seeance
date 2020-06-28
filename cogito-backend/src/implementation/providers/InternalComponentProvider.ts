import {AnalysisRepository} from "../../logic/repositories/components/AnalysisRepository";
import {AnalysisTemplate} from "../../logic/entities/analysis/AnalysisTemplate";
import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";

const ComponentRepository = require('seeance-analysis-core').ComponentProvider

export class InternalComponentProvider implements AnalysisRepository{

    repository: any;

    constructor() {
        this.repository = ComponentRepository()
        this.repository.init({
            customRepositories: ['felixrdl/seeance-test']
        }).then(() => {
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

}