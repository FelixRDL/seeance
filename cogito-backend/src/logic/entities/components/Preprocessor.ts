/**
 * Instance of Preprocessor assigned to a project
 */
export interface Preprocessor {
    _id: string;
    template: string;
    config: any;
    assignedToProjectId: string;
    assignedToCourseId: string;
}