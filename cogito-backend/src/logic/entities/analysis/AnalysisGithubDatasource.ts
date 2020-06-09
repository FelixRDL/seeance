import {AnalysisDatasource} from "./AnalysisDatasource";
import {MethodNotImplementedError} from "../../core/errors/MethodNotImplementedError";
import {AnalysisGitDatasourceRequest} from "./AnalysisGitDatasource";

export interface AnalysisGithubDatasourceRequest {
    token: string;
    owner: string;
    repo: string;
}

/**
 * This entity uses an abstract class to enable implementation check, as described in:
 * (https://medium.com/@radekqwerty/typescript-how-to-check-that-argument-implements-interface-in-javascript-version-559e1bd2d83b)
 */
export abstract class AnalysisGithubDatasource <OutType> extends AnalysisDatasource<AnalysisGithubDatasourceRequest, OutType>{
    async getData(req: AnalysisGithubDatasourceRequest): Promise<OutType> {
        return Promise.reject(new MethodNotImplementedError());
    }
}