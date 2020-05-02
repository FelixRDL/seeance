import * as express from 'express';
import {GithubAuthManager} from "../security/GithubAuthManager";
import {GetAccessTokenFromCode} from "../../logic/use-cases/auth/GetAccessTokenFromCode";
import {VerifyToken} from "../../logic/use-cases/auth/VerifyToken";

export class AuthController {

    private authManager: GithubAuthManager = new GithubAuthManager();

    getAccessToken(request: express.Request): Promise<string> {
        const token: string = <string>request.query.code;
        return GetAccessTokenFromCode(token, this.authManager);
    }

    async validateAccessToken(request: express.Request): Promise<boolean> {
        try {
            const token: string = <string>request.headers.authorization;
            return VerifyToken(token, this.authManager);
        } catch(e) {
            return Promise.reject(new NoTokenAvailableError());
        }
    }

    async validAccessTokenMw(req: express.Request, res: express.Response, next: any) {
        try {
            const result: boolean = await this.validateAccessToken(req);
            if(!result) {
                res.status(401).send("Invalid Access Token");
            } else {
                next();
            }
        } catch(e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }

    static getBearerAuthHeader(uri: string, token: string): any {
        return {
            url: uri,
            headers: { 'User-Agent': 'Client' },
            auth: { 'bearer': token }
        };
    }
}

export class NoTokenAvailableError extends Error {
    constructor() {
        super();
        this.message = "No Access Token Available!";
    }
}