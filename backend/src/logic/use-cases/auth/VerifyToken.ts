import {AuthManager} from "../../repositories/AuthManager";

export function VerifyToken(token: string, authManager: AuthManager): Promise<boolean> {
    if(!token) {
        // @ts-ignore
        return Promise.reject(new NoTokenProvidedError());
    }
    else {
        return authManager.verifyToken(token);
    }
}

export class NoTokenProvidedError extends Error {
    constructor() {
        super();
        this.message = "No Token Provided!";
    }
}