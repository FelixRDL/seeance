import {
    AnalysisGitDatasource,
    AnalysisGitDatasourceRequest
} from "../../../logic/entities/analysis/AnalysisGitDatasource";
import {Commit, Repository} from "nodegit";

class UsersRawData {
    users: any[] = [];
}

export class UsersDatasource extends AnalysisGitDatasource<UsersRawData> {
    key = "users";
    async getData(req: AnalysisGitDatasourceRequest): Promise<UsersRawData> {
        const result: UsersRawData = new UsersRawData();
        var repo = await Repository.open(req.path);
        var revwalk = await repo.createRevWalk();
        revwalk.pushGlob('refs/heads/*');
        // https://stackoverflow.com/questions/38335804/getting-all-commits-on-all-branches-with-nodegit
        let commits: any[] = await revwalk.getCommitsUntil((c: any) => true);
        result.users = commits.reduce((acc, c: Commit, idx: number, {}) => {
            const author = c.author();
            if(!acc[author.name()]) {
                acc[author.name()] = {
                    name: author.name(),
                    email: author.email(),
                };
            }
            return acc;
        });
        return Promise.resolve(result);
    }
}