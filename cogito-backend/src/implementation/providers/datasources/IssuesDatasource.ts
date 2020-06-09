import {
    AnalysisGithubDatasource,
    AnalysisGithubDatasourceRequest
} from "../../../logic/entities/analysis/AnalysisGithubDatasource";
import {Octokit} from "@octokit/rest";

class IssuesRawData {
    issues: any[] = [];
}

export class IssuesRawDatasource extends AnalysisGithubDatasource<IssuesRawData> {
    key = "issues";
    async getData(req: AnalysisGithubDatasourceRequest): Promise<IssuesRawData> {
        const result: IssuesRawData = new IssuesRawData();
        const octokit: Octokit = new Octokit({auth: req.token, request: {timeout: 10000}});
        const issues = await octokit.paginate(octokit.issues.listForRepo as any, {
            owner: req.owner,
            repo: req.repo,
            state: 'all'
        });
        result.issues = issues;
        return Promise.resolve(result);
    }
}