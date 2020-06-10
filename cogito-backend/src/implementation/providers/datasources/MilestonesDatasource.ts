import {
    AnalysisGithubDatasource,
    AnalysisGithubDatasourceRequest
} from "../../../logic/entities/analysis/AnalysisGithubDatasource";
import {Octokit} from "@octokit/rest";

class MilestonesRawData {
    milestones: any[] = [];
}

export class MilestonesDatasource extends AnalysisGithubDatasource<MilestonesRawData> {
    key = "milestones";
    async getData(req: AnalysisGithubDatasourceRequest): Promise<MilestonesRawData> {
        const result: MilestonesRawData = new MilestonesRawData();
        const octokit: Octokit = new Octokit({auth: req.token, request: {timeout: 10000}});
        const milestones = await octokit.paginate(octokit.issues.listMilestones as any, {
            owner: req.owner,
            repo: req.repo
        });
        result.milestones = milestones;
        return Promise.resolve(result);

    }
}