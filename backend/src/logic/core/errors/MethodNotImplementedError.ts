export class MethodNotImplementedError extends Error {
    constructor() {
        super();
        this.message = "Dev has been lazy - this method is not yet available, sorry.";
    }
}