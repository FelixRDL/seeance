/**
 * The Analysis Manifest describes formal metadata related
 */
export interface AnalysisManifest {
    title: string;
    description: string;
    /**
     * A json object describing the format of config objects for analysis
     */
    configTemplate: any;
    dataSources: string[];
}