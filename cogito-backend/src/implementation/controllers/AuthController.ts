import * as express from 'express';
import {GithubAuthManager} from "../security/GithubAuthManager";
import {GetAccessTokenFromCode} from "../../logic/use-cases/auth/GetAccessTokenFromCode";
import {MethodNotImplementedError} from "../../logic/core/errors/MethodNotImplementedError";

export class AuthController {
    private authManager: GithubAuthManager = new GithubAuthManager();

    getAccessToken(request: express.Request): Promise<string> {
        const token: string = <string>request.query.code;
        return GetAccessTokenFromCode(token, this.authManager);
    }

    validateAccessToken(token: string): Promise<boolean> {
        return Promise.reject(new MethodNotImplementedError());
    }
}