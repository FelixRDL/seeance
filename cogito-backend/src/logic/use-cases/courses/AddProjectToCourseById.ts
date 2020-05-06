import {Project} from "../../entities/Project";
import {CourseRepository} from "../../repositories/CourseRepository";
import {Course} from "../../entities/Course";
import {CourseNotExistingError} from "./GetCourseById";
import {InternalServerError} from "../../core/errors/InternalServerError";

export async function AddProjectToCourseById(courseId: string, project: Project, courseRepository: CourseRepository): Promise<Course> {
    try {
        const course: Course = await courseRepository.getCourseById(courseId);
        if(!course) {
            return Promise.reject(new CourseNotExistingError());
        } else {
            const isProjectAlreadyAdded = await courseRepository.containsCourseProject(course, project);
            if(isProjectAlreadyAdded) {
                return Promise.reject(new ProjectAlreadyExistingInCourseError());
            } else {
                await courseRepository.addProjectToCourse(course, project);
                return courseRepository.getCourseById(courseId);
            }
        }
    } catch(e) {
        return Promise.reject(new InternalServerError());
    }
}

export class ProjectAlreadyExistingInCourseError extends Error {
    constructor() {
        super();
        this.message = "This project is already added to the course!";
    }
}