import {
    AnalysisGitDatasource,
    AnalysisGitDatasourceRequest
} from "../../../logic/entities/analysis/AnalysisGitDatasource";
import simpleGit, {gitP, SimpleGit} from 'simple-git';

class DiffsData {
    diffs: any[] = [];
}

export class DiffsDatasource extends AnalysisGitDatasource<DiffsData> {
    key = "diffs";
    async getData(req: AnalysisGitDatasourceRequest): Promise<DiffsData> {
        const result: DiffsData = new DiffsData();

        const git: SimpleGit = simpleGit(req.path);
        const log = await git.log();
        const hashes = log.all.map((log) => log.hash);
        let promises = [];
        for(var i = 1; i < hashes.length; i++) {
            promises.push(git.diff([
                hashes[i - 1],
                hashes[i]
            ]));
        }
        var diffs = await Promise.all(promises);
        /*diffs = diffs.map((diff: string) => {
            let parts = diff.split("\n");
            return parts[0];
        })*/
        result.diffs = diffs.map(this.parseDiff);

        return Promise.resolve(result);
    }

    private parseDiff(diff: string): any {
        return diff;
    }
}