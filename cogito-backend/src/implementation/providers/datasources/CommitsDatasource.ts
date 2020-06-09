import {
    AnalysisGitDatasource,
    AnalysisGitDatasourceRequest
} from "../../../logic/entities/analysis/AnalysisGitDatasource";
import {Commit, Repository} from "nodegit";

class CommitsRawData {
    commits: any[] = [];
}

export class CommitsDatasource extends AnalysisGitDatasource<CommitsRawData> {
    key = "commits";
    async getData(req: AnalysisGitDatasourceRequest): Promise<CommitsRawData> {
        const result: CommitsRawData = new CommitsRawData();
        var repo = await Repository.open(req.path);
        var revwalk = await repo.createRevWalk();
        revwalk.pushGlob('refs/heads/*');
        // https://stackoverflow.com/questions/38335804/getting-all-commits-on-all-branches-with-nodegit
        let commits: any[] = await revwalk.getCommitsUntil((c: any) => true);
        result.commits = commits.map((c: Commit) => {
            return {
                sha:  c.sha(),
                msg: c.message(),
                date: c.date(),
                commiter: {
                    name: c.committer().name(),
                    email: c.committer().email()
                },
                author: {
                    name: c.author().name(),
                    email: c.author().email()
                }
            }
        });
        return Promise.resolve(result);
    }
}