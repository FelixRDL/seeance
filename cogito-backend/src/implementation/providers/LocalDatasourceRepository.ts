import {DatasourceRepository} from "../../logic/repositories/analysis/DatasourceRepository";
import {AnalysisDatasource} from "../../logic/entities/analysis/AnalysisDatasource";
import {AnalysisGitDatasource, AnalysisGitDatasourceRequest} from "../../logic/entities/analysis/AnalysisGitDatasource";
import * as Nodegit from "nodegit";
import {Commit, Repository, Revwalk} from "nodegit";

export class LocalDatasourceRepository implements DatasourceRepository {
    // TODO: make this dynamic (e.g. folder based)
    private sources: AnalysisDatasource<any, any>[] = [new CommitsDatasource(), new UsersDatasource()];

    getByName(name: string): Promise<AnalysisDatasource<any, any>> {
        const result = this.sources.find(el => el.key === name);
        if (!result) {
            return Promise.reject("Source not found by name " + name);
        } else {
            return Promise.resolve(result);
        }
    }
}


/**
 * TODO: this should be loaded from directory
 */
export class CommitsRawData {
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
                author: c.author()
            }
        });
        return Promise.resolve(result);
    }
}
/**
 * TODO: this should be loaded from directory
 */
export class UsersRawData {
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