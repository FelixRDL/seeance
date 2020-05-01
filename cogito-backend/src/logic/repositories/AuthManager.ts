export interface AuthManager {
    getTokenFromCode(code: string): Promise<string>;
    verifyToken(token: string): Promise<boolean>;
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super();
        this.message = "Invalid Credentials!";
    }
}