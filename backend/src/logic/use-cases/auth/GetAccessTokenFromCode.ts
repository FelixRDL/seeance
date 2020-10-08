import {AuthManager} from "../../repositories/AuthManager";

export function GetAccessTokenFromCode(code: string, authManager: AuthManager): Promise<string> {
    if(!code) {
        // @ts-ignore
        return Promise.reject(new NoCodeProvidedError());
    }
    else {
        return authManager.getTokenFromCode(code);
    }
}

export class NoCodeProvidedError extends Error {
    constructor() {
        super();
        this.message = "No Code Provided Error";
    }
}