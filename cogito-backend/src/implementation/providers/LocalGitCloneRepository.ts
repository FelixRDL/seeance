import {GitCloneRepository} from "../../logic/repositories/analysis/GitCloneRepository";
import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";
import {Clone} from 'nodegit';
import {existsSync} from 'fs';

export class LocalGitCloneRepository implements GitCloneRepository {

    private token: string;
    private rootDir: string;

    constructor(token: string, rootDir: string) {
        this.token = token;
        this.rootDir = rootDir;
    }

    async clone(owner: string, name: string): Promise<string> {
        const repoUrl: string = "https://"+ this.token + "@github.com/" + owner + "/" + name;
        const localPath: string = this.rootDir + "/" + owner + "/" + name;
        let clone = await Clone.clone(repoUrl, localPath);
        return localPath;
    }

    async exists(owner: string, name: string): Promise<boolean> {
        return Promise.resolve(existsSync(this.rootDir + "/" + owner + "/" + name));
    }

    async update(owner: string, name: string): Promise<string> {
        return Promise.reject(new MethodNotImplementedError());
    }

}