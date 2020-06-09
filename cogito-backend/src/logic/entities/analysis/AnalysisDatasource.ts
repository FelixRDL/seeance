import {MethodNotImplementedError} from "../../core/errors/MethodNotImplementedError";

/**
 * This entity uses an abstract class to enable implementation check, as described in:
 * (https://medium.com/@radekqwerty/typescript-how-to-check-that-argument-implements-interface-in-javascript-version-559e1bd2d83b)
 */
export abstract class AnalysisDatasource<RequestType, OutputType> {
    async getData(req: RequestType): Promise<OutputType> {
        return Promise.reject(new MethodNotImplementedError())
    }
}