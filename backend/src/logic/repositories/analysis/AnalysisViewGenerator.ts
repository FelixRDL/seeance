export interface AnalysisViewGenerator {
    getAnalysisView(
        repoOwner: string,
        repoUrl: string,
        datasources: any[],
        preprocessors: any[],
        analysis: any,
        token?: string
    ): Promise<string>;
    preload(
        repoOwner: string,
        repoName: string,
        token?: string
    ): Promise<void>;
    cleanup(
        repoOwner: string,
        repoName: string
    ): Promise<void>;
}