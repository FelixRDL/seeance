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
        req.analysis.template.manifest.dataSources.map(async name => datasourceRepo.getByName(name)));
    // TODO: das funktioniert noch nicht

    console.log(req.analysis.template.manifest.dataSources, datasources);

    // Clone repo
    if(await cloneRepo.exists(req.repoOwnerName, req.repoName)) {
        // TODO: implement update
        try {
            console.log("Update sum shizz", req.repoOwnerName, req.repoName);
            repoPath = await cloneRepo.update(req.repoOwnerName, req.repoName);
        } catch(e) {
            console.error(e);
            repoPath = './../../tmp' + req.repoOwnerName + "/" + req.repoName;
        }
    } else {
            console.log("Clone sum shizz", req.repoOwnerName, req.repoName);
            repoPath = await cloneRepo.clone(req.repoOwnerName, req.repoName);
    }

    // Fetch All Data
    let rawDataDict: any = await Promise.all(
        datasources.map(async (source: AnalysisDatasource<any, any>) => {
            console.log("TYPE", source.constructor);
            console.log("TYPE", source.constructor.prototype);
            console.log(AnalysisDatasource.prototype)
            if(source.constructor instanceof AnalysisGitDatasource.prototype.constructor) {
                (<AnalysisGitDatasource<any>>source).getData(<AnalysisGitDatasourceRequest> {
                    path: repoPath
                })
            } else if(source.constructor.prototype instanceof AnalysisGithubDatasource) {
                (<AnalysisGithubDatasource<any>>source).getData(<AnalysisGithubDatasourceRequest> {
                    owner: req.repoOwnerName,
                    repo: req.repoName
                })
            } else {
                return Promise.reject("Unknown Datasource type!")
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