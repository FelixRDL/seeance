import {AnalysisViewGenerator} from "../../logic/repositories/analysis/AnalysisViewGenerator";

export class InternalAnalysisViewGenerator implements AnalysisViewGenerator {

    getAnalysisView(repoOwner: string, repoName: string, datasources: any[], preprocessors: any[], analysis: any, token?: string): Promise<string> {
        return Promise.resolve(require('seeance-analysis-core').analyze(
            repoOwner,
            repoName,
            datasources,
            preprocessors,
            analysis,
            token
        ));
    }
}