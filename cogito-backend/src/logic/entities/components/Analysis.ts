import {AnalysisTemplate} from "./AnalysisTemplate";

/**
 * Instance of Analysis assigned to a project
 */
export interface Analysis {
    _id: string;
    template: AnalysisTemplate;
    config: any;
    assignedToProjectId: string;
    assignedToCourseId: string;
}