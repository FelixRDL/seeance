import {MethodNotImplementedError} from "../../core/errors/MethodNotImplementedError";
import {Analysis} from "../../entities/analysis/Analysis";
import {AnalysisDatasource} from "../../entities/analysis/AnalysisDatasource";
import {DatasourceRepository} from "../../repositories/analysis/DatasourceRepository";
import {AnalysisGitDatasource, AnalysisGitDatasourceRequest} from "../../entities/analysis/AnalysisGitDatasource";
import {GitCloneRepository} from "../../repositories/analysis/GitCloneRepository";
import {
    AnalysisGithubDatasource,
    AnalysisGithubDatasourceRequest
} from "../../entities/analysis/AnalysisGithubDatasource";

export async function GetAnalysis (
    req: GetAnalysisRequest,
    datasourceRepo: DatasourceRepository,
    cloneRepo: GitCloneRepository
): Promise<string> {
    let repoPath: string;
    
    // First, get all necessary datasources
    let datasources: AnalysisDatasource<any, any>[] = await Promise.all(
        req.analysis.template.manifest.dataSources.map(name => datasourceRepo.getByName(name)));

    // Clone repo
    if(! await cloneRepo.exists(req.repoOwnerName, req.repoName)) {
        repoPath = await cloneRepo.update(req.repoOwnerName, req.repoName);
    } else {
        repoPath = await cloneRepo.clone(req.repoOwnerName, req.repoName);
    }

    // Fetch All Data
    let rawDataDict: any = await Promise.all(
        datasources.map((source: AnalysisDatasource<any, any>) => {
            if(source instanceof AnalysisGitDatasource) {
                return (<AnalysisGitDatasource<any>>source).getData(<AnalysisGitDatasourceRequest> {
                    path: repoPath
                })
            } else if(source instanceof AnalysisGithubDatasource) {
                return (<AnalysisGithubDatasource<any>>source).getData(<AnalysisGithubDatasourceRequest> {
                    owner: req.repoOwnerName,
                    repo: req.repoName
                })
            }
        })
    );

    console.log(rawDataDict);

    // TODO: caching?

    // TODO: analysis


    return Promise.reject(new MethodNotImplementedError());
}

export interface GetAnalysisRequest {
    analysis: Analysis,
    repoName: string;
    repoOwnerName: string;
}