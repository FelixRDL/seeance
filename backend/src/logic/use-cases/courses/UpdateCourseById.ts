import {Course} from "../../entities/Course";
import {CourseRepository} from "../../repositories/CourseRepository";
import {CourseNotExistingError} from "./GetCourseById";

export async function UpdateCourseById(req: UpdateCourseByIdRequest, repository: CourseRepository): Promise<Course> {
    try {
        if(!await repository.existsCourseById(req.courseId)) {
            return Promise.reject(new CourseNotExistingError());
        } else {
            await repository.updateCourseById(req.courseId, req.course);
            return repository.getCourseById(req.courseId);
        }
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

export interface UpdateCourseByIdRequest {
    courseId: string,
    course: Course
}