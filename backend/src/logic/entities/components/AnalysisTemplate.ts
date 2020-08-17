export interface AnalysisTemplate {
    name: string,
    description: string,
    depends_on: string,
    category: string,
    /**
     * JSON-schema object
     */
    configSchema: any,
    module: any,
    package: Object,
    layout?: any
}