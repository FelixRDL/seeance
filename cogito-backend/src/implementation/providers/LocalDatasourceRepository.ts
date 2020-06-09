import {DatasourceRepository} from "../../logic/repositories/analysis/DatasourceRepository";
import {AnalysisDatasource} from "../../logic/entities/analysis/AnalysisDatasource";
import {AnalysisGitDatasource, AnalysisGitDatasourceRequest} from "../../logic/entities/analysis/AnalysisGitDatasource";
import * as Nodegit from "nodegit";

export class LocalDatasourceRepository implements DatasourceRepository {
    // TODO: make this dynamic (e.g. folder based)
    private sources: AnalysisDatasource<any, any>[] = [new CommitsDatasource()];

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
    commits: Nodegit.Commit[] = [];
}

export class CommitsDatasource implements AnalysisGitDatasource<CommitsRawData> {
    key = "commits";

    async getData(req: AnalysisGitDatasourceRequest): Promise<CommitsRawData> {
        var pathToRepo = require("path").resolve(req.path);
        var repo: Nodegit.Repository = await Nodegit.Repository.open(pathToRepo);
        var revwalk = Nodegit.Revwalk.create(repo);
        const commits: Nodegit.Commit[] = await revwalk.getCommits(10000);
        console.log("Commits", commits);
        return Promise.resolve(new CommitsRawData());
    }
}