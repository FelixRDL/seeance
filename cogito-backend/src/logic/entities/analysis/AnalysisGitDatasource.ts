import {AnalysisDatasource} from "./AnalysisDatasource";

export interface AnalysisGitDatasource {
    path: string;
}

export interface AnalysisGithubDatasource <OutType> extends AnalysisDatasource<AnalysisGitDatasource, OutType>{}