export class InternalServerError extends Error {
    constructor() {
        super();
        this.message = "Internal Server Error.";
    }
}