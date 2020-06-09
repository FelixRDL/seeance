import {GitCloneRepository} from "../../logic/repositories/analysis/GitCloneRepository";
import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";
import {Clone, Cred} from 'nodegit';
import * as fs from "fs";

export class LocalGitCloneRepository implements GitCloneRepository {

    private token: string;
    private rootDir: string;

    constructor(token: string, rootDir: string) {
        this.token = token;
        this.rootDir = rootDir;
    }

    async clone(owner: string, name: string): Promise<string> {
        const repoUrl: string = "https://github.com/" + owner + "/" + name;
        const localPath: string = this.rootDir + "/" + owner + "/" + name;
        // Auth taken from: https://github.com/nodegit/nodegit/blob/beaa78d09798332984c729f001990a82670178fb/examples/cloneFromGithubWith2Factor.js
        var that = this;
        var opts = {
            fetchOpts: {
                callbacks: {
                    credentials: function() {
                        return Cred.userpassPlaintextNew(that.token, "x-oauth-basic");
                    },
                    certificateCheck: function() {
                        return 1;
                    }
                }
            }
        };
        await Clone.clone(repoUrl, localPath, opts);
        return Promise.resolve(localPath);
    }

    async exists(owner: string, name: string): Promise<boolean> {
        const path: string = this.rootDir + "/" + owner + "/" + name;
        console.log(path, fs.existsSync(path))
        return Promise.resolve(fs.existsSync(path));
    }

    async update(owner: string, name: string): Promise<string> {
        return Promise.reject(new MethodNotImplementedError());
    }

}