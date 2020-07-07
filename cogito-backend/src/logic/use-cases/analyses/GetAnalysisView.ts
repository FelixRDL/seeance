import {Analysis} from "../../entities/components/Analysis";
import {AnalysisViewGenerator} from "../../repositories/analysis/AnalysisViewGenerator";
import {AnalysisTemplate} from "../../entities/components/AnalysisTemplate";
import {DatasourceTemplateRepository} from "../../repositories/analysis/DatasourceTemplateRepository";
import {PreprocessorTemplateRepository} from "../../repositories/analysis/PreprocessorTemplateRepository";
import {AnalysisTemplateRepository} from "../../repositories/analysis/AnalysisTemplateRepository";
import {Preprocessor} from "../../entities/components/Preprocessor";
import {PreprocessorRepository} from "../../repositories/analysis/PreprocessorRepository";

export async function GetAnalysisView (
    req: GetAnalysisViewRequest,
    gen: AnalysisViewGenerator,
    datasourceRepo: DatasourceTemplateRepository,
    preprocessorTemplateRepo: PreprocessorTemplateRepository,
    analysisRepository: AnalysisTemplateRepository
) {
    const analysisTemplate: AnalysisTemplate = await analysisRepository.getAnalysisTemplateByName(req.analysis.analysis)
    let analysisConfig = {
        module: analysisTemplate.module,
        package: analysisTemplate.package,
        config: req.analysis.config,
    }
    const preprocessorConfigs = await Promise.all(req.preprocessors.map(async (preprocessor: Preprocessor) => {
        console.log(preprocessor)
        console.log(preprocessor.template)
        const ppTemplate = await preprocessorTemplateRepo.getPreprocessorByName(preprocessor.template)
        return Promise.resolve({
            module: ppTemplate.module,
            package: ppTemplate.package,
            config: preprocessor.config
        })
    }))
    // @ts-ignore
    let analysisDeps = analysisConfig.package['seeance']['depends_on']
    let prepDeps = (preprocessorConfigs.map((pp) => pp.package['seeance']['depends_on']))
    let flattenedPrepDeps: string[] = prepDeps.reduce((acc, currentValue) => {
        return acc.concat(currentValue)
    }, [])
    let deps = analysisDeps.concat(flattenedPrepDeps)
    console.log(deps)
    const datasources = await Promise.all(deps.map((ds: string) => datasourceRepo.getDatasourceByName(ds)))
    return Promise.resolve(
        await gen.getAnalysisView(
            req.repoOwner,
            req.repoName,
            datasources,
            preprocessorConfigs,
            analysisConfig,
            req.token
        )
    )
}

export interface GetAnalysisViewRequest {
    repoOwner: string,
    repoName: string,
    preprocessors: Preprocessor[],
    analysis: Analysis,
    token?: string
}
