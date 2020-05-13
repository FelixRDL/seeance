export class Util {
    static clone(input: any): any {
        return JSON.parse(JSON.stringify(input));
    }
}