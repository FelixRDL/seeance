import {User} from "../entities/User";
import {Project, ProtoProject} from "../entities/Project";

export interface ProjectRepository {
    // TODO legacy
    getProjectsByName(token: string, instr: string): Promise<Project[]>;
    getProjectById(id: string): Promise<ProtoProject>;
    createProject(project: Project): Promise<ProtoProject>;
    getProjectsForCourse(courseId: string): Promise<ProtoProject[]>;
    deleteProjectById(projectId: string, courseId: string): Promise<boolean>;
    removeAllProjectsForCourse(courseId: string): Promise<void>;

    addAnalysisToProject(projectId: string, courseId: string, analysisId: string): Promise<string[]>;
    removeAnalysisFromProject(projectId: string, courseId: string, analysisId: string): Promise<void>;
    addPreprocessorToProject(projectId: string, courseId: string, preprocessorId: string): Promise<string[]>;
    removePreprocessorFromProject(projectId: string, courseId: string, preprocessorId: string): Promise<void>;
}