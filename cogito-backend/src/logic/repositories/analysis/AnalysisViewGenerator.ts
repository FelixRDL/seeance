export interface AnalysisViewGenerator {
    getAnalysisView(
        repoOwner: string,
        repoUrl: string,
        datasources: any[],
        preprocessors: any[],
        analysis: any
    ): Promise<string>;
}