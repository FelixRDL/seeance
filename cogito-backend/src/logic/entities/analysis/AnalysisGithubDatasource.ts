import {AnalysisDatasource} from "./AnalysisDatasource";

export interface AnalysisGithubDatasourceRequest {
    token: string;
    owner: string;
    repo: string;
}

export interface AnalysisGithubDatasource <OutType> extends AnalysisDatasource<AnalysisGithubDatasourceRequest, OutType>{}