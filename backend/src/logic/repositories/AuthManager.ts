export interface AuthManager {
    getTokenFromCode(code: string): Promise<string>;
    verifyToken(token: string): Promise<boolean>;
    revokeToken(token: string): Promise<void>;
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super();
        this.message = "Invalid Credentials!";
    }
}