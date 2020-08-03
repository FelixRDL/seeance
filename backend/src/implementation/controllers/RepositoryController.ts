import * as express from "express";
import {RepoRepository} from "../../logic/repositories/RepoRepository";
import {InternalRepositoryProvider} from "../providers/InternalRepositoryProvider";
import {GetRepositoryAutocomplete} from "../../logic/use-cases/repositories/GetRepositoryAutocomplete";
import {Repository} from "../../logic/entities/Repository";
import {GetRepositoryById} from "../../logic/use-cases/repositories/GetRepositoryById";

export class RepositoryController {
    private repository: RepoRepository = new InternalRepositoryProvider();

    async getRepositoriesAutocomplete(req: express.Request, res: express.Response) {
        const token: string = <string>req.headers.authorization;
        try {
            const repos: Repository[] = await GetRepositoryAutocomplete(<string>req.query['q'], new InternalRepositoryProvider(token));
            res.send(repos);
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }

    async getRepositoryById(req: express.Request, res: express.Response) {
        const token: string = <string>req.headers.authorization;
        const id: string = req.params.id;
        try {
            const repo: Repository = await GetRepositoryById(id, new InternalRepositoryProvider(token));
            res.send(repo);
        } catch(e) {
            console.error(e);
            res.status(500).send("Internal Server Error");
        }
    }
}