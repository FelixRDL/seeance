export interface PreprocessorTemplate {
    name: string,
    description: string,
    depends_on: string,
    produces: string,
    /**
     * JSON-schema object
     */
    configSchema: any,
    module: any
}