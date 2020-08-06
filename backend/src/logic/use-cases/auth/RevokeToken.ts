import {AuthManager} from "../../repositories/AuthManager";

export function RevokeToken(token: string, authManager: AuthManager): Promise<void> {
    if(!token) {
        // @ts-ignore
        return Promise.reject(new NoTokenProvidedError());
    }
    else {
        return authManager.revokeToken(token);
    }
}

export class NoTokenProvidedError extends Error {
    constructor() {
        super();
        this.message = "No Token Provided!";
    }
}