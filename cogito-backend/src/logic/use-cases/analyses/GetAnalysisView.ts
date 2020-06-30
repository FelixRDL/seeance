import {Analysis} from "../../entities/components/Analysis";
import {AnalysisViewGenerator} from "../../repositories/analysis/AnalysisViewGenerator";
import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";
import {DatasourceTemplateRepository} from "../../repositories/analysis/DatasourceTemplateRepository";
import {PreprocessorTemplateRepository} from "../../repositories/analysis/PreprocessorTemplateRepository";
import {AnalysisTemplateRepository} from "../../repositories/analysis/AnalysisTemplateRepository";
import {Preprocessor} from "../../entities/components/Preprocessor";

export async function GetAnalysisView (
    req: GetAnalysisViewRequest,
    gen: AnalysisViewGenerator,
    datasourceRepo: DatasourceTemplateRepository,
    preprocessorRepo: PreprocessorTemplateRepository,
    analysisRepository: AnalysisTemplateRepository
) {
    const analysisTemplate: AnalysisTemplate = await analysisRepository.getAnalysisTemplateByName(req.analysis.template)
    let analysisConfig = {
        module: analysisTemplate.module,
        package: analysisTemplate.package,
        config: req.analysis.config,
    }
    const preprocessorConfigs = await Promise.all(req.preprocessors.map(async (preprocessor: Preprocessor) => {
        const ppTemplate = await preprocessorRepo.getPreprocessorByName(preprocessor.template)
        return Promise.resolve({
            module: ppTemplate.module,
            package: ppTemplate.package,
            config: preprocessor.config
        })
    }))
    // @ts-ignore
    const dependencies: string[] = analysisConfig.package['seeance']['depends_on']
        .concat(preprocessorConfigs.map((pp) => pp.package['seeance']['depends_on']))
    const datasources = await Promise.all(dependencies.map((ds: string) => datasourceRepo.getDatasourceByName(ds)))


    return Promise.resolve(
        await gen.getAnalysisView(
            req.repoOwner,
            req.repoName,
            datasources,
            preprocessorConfigs,
            analysisConfig)
    )
}

export interface GetAnalysisViewRequest {
    repoOwner: string,
    repoName: string,
    datasources: any[],
    preprocessors: Preprocessor[],
    analysis: Analysis
}
