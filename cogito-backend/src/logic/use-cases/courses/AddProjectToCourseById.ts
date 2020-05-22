import {Project} from "../../entities/Project";
import {CourseRepository} from "../../repositories/CourseRepository";
import {Course} from "../../entities/Course";
import {InternalServerError} from "../../core/errors/InternalServerError";
import {RepoRepository} from "../../repositories/RepoRepository";
import {MethodNotImplementedError} from "../../core/errors/MethodNotImplementedError";
import {ProtoProjectToProjectMapper} from "../../repositories/mappers/ProtoProjectToProjectMapper";
import {ProjectRepository} from "../../repositories/ProjectRepository";

export async function AddProjectToCourseById(
    courseId: string,
    project: Project,
    courseRepository: CourseRepository,
    projectRepository: ProjectRepository,
    repositoryProvider: RepoRepository): Promise<Course> {
    try {
        const course: Course = await courseRepository.getCourseById(courseId);
        return Promise.resolve(course);
    } catch(e) {
        console.error(e);
        return Promise.reject(new InternalServerError());
    }
}

export class ProjectAlreadyExistingInCourseError extends Error {
    constructor() {
        super();
        this.message = "This project is already added to the course!";
    }
}