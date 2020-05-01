import * as express from 'express';
import {GithubAuthManager} from "../security/GithubAuthManager";
import {GetAccessTokenFromCode} from "../../logic/use-cases/auth/GetAccessTokenFromCode";
import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";
import {VerifyToken} from "../../logic/use-cases/auth/VerifyToken";

export class AuthController {
    private authManager: GithubAuthManager = new GithubAuthManager();

    getAccessToken(request: express.Request): Promise<string> {
        const token: string = <string>request.query.code;
        return GetAccessTokenFromCode(token, this.authManager);
    }

    validateAccessToken(request: express.Request): Promise<boolean> {
        try {
            const bearer: string = <string>request.headers.authorization;
            const token: string = bearer.split(" ")[1];
            return VerifyToken(token, this.authManager);
        } catch(e) {
            return Promise.reject(new NoTokenAvailableError());
        }
    }
}

export class NoTokenAvailableError extends Error {
    constructor() {
        super();
        this.message = "No Access Token Available!";
    }
}