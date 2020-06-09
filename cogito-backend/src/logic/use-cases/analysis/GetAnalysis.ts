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
    cloneRepo: GitCloneRepository,
    onProgress?: any
): Promise<string> {
    let repoPath: string;

    // First, get all necessary datasources
    let datasources: AnalysisDatasource<any, any>[] = await Promise.all(
        req.analysis.template.manifest.dataSources.map(async name => datasourceRepo.getByName(name)));

    onProgress("Cloning Repository\n");

    // Clone repo
    if(await cloneRepo.exists(req.repoOwnerName, req.repoName)) {
        // TODO: implement update through git pull
        try {
            repoPath = await cloneRepo.update(req.repoOwnerName, req.repoName);
        } catch(e) {
            console.error(e);
            repoPath = './../../tmp/' + req.repoOwnerName + "/" + req.repoName;
        }
    } else {
            repoPath = await cloneRepo.clone(req.repoOwnerName, req.repoName);
    }

    onProgress("Fetching " + datasources.length + " Datasources\n");

    // Fetch All Data
    // TODO: store in dict with other types
    let rawDataDict: any = await Promise.all(
        datasources.map(async (source: AnalysisDatasource<any, any>) => {
            if(source.constructor.prototype instanceof AnalysisGitDatasource) {
                return (<AnalysisGitDatasource<any>>source).getData(<AnalysisGitDatasourceRequest> {
                    path: repoPath,
                });
            } else if(source.constructor.prototype instanceof AnalysisGithubDatasource) {
                return (<AnalysisGithubDatasource<any>>source).getData(<AnalysisGithubDatasourceRequest> {
                    owner: req.repoOwnerName,
                    repo: req.repoName,
                    token: req.token
                });
            } else {
                return Promise.reject("Unknown Datasource type!")
            }
        })
    );

    onProgress("Execute Plugin\n");

    // TODO: caching?

    const result: string = req.analysis.template.process(rawDataDict, req.analysis.config);


    return Promise.resolve(result);
}

export interface GetAnalysisRequest {
    analysis: Analysis,
    repoName: string;
    repoOwnerName: string;
    token: string;
}