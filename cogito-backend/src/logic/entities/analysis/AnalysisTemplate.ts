import {AnalysisManifest} from "./AnalysisManifest";

export interface AnalysisTemplate {
    manifest: AnalysisManifest;
    process(input: any, config: any): string;
}