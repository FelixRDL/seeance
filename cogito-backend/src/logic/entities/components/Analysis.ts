import {AnalysisTemplate} from "./AnalysisTemplate";

/**
 * Instance of Analysis assigned to a project
 */
export interface Analysis {
    _id: string;
    analysis: string;
    config: any;
    assignedToProjectId: string;
    assignedToCourseId: string;
}