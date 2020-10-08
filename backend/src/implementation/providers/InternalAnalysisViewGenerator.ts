import {AnalysisViewGenerator} from "../../logic/repositories/analysis/AnalysisViewGenerator";
const core = require('seeance-analysis-core')


export class InternalAnalysisViewGenerator implements AnalysisViewGenerator {

    getAnalysisView(repoOwner: string, repoName: string, datasources: any[], preprocessors: any[], analysis: any, token?: string): Promise<string> {
        return Promise.resolve(core.analyze(
            repoOwner,
            repoName,
            datasources,
            preprocessors,
            analysis,
            token
        ));
    }

    cleanup(repoOwner: string, repoName: string): Promise<void> {
        return core.cleanup(repoOwner, repoName);
    }

    preload(repoOwner: string, repoName: string, token?: string): Promise<void> {
        return core.prepare(repoOwner, repoName, token);
    }
}