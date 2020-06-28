import {AnalysisTemplate} from "./AnalysisTemplate";

/**
 * Instance of Analysis assigned to a project
 */
export interface Analysis {
    template: AnalysisTemplate;
    config: any;
    assignedToProjectId: string;
}