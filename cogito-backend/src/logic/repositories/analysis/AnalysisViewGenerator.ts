export interface AnalysisViewGenerator {
    getAnalysisView(
        repoOwner: string,
        repoUrl: string,
        datasources: any[],
        preprocessors: any[],
        analysis: any,
        token?: string
    ): Promise<string>;
}