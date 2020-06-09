import {AnalysisDatasource} from "./AnalysisDatasource";
import {MethodNotImplementedError} from "../../core/errors/MethodNotImplementedError";

export interface AnalysisGitDatasourceRequest{
    path: string;
}
/**
 * This entity uses an abstract class to enable implementation check, as described in:
 * (https://medium.com/@radekqwerty/typescript-how-to-check-that-argument-implements-interface-in-javascript-version-559e1bd2d83b)
 */
export abstract class AnalysisGitDatasource <OutType> extends AnalysisDatasource<AnalysisGitDatasourceRequest, OutType>{
    async getData(req: AnalysisGitDatasourceRequest): Promise<OutType> {
        return Promise.reject(new MethodNotImplementedError());
    }
}