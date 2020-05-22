import {CourseRepository} from "../../repositories/CourseRepository";
import {Course} from "../../entities/Course";
import {UserAlreadyAuthorizedForCourseError} from "./AddAuthorizeeToCourseById";

export async function RemoveAuthorizeeFromCourse (
    req: RemoveAuthorizeeFromCourseRequest,
    courseRepository: CourseRepository)
    : Promise<void> {
    try {
        const course: Course = await courseRepository.getCourseById(req.courseId);
        if(req.userId == course.ownerId || course.authorizeeIds.includes(req.userId)) {
            return Promise.reject(new UserAlreadyAuthorizedForCourseError())
        } else {
            return courseRepository.removeUserFromCourseAuthorizees(req.userId, req.courseId);
        }
    } catch(e) {
        return Promise.reject(e);
    }
}

export interface RemoveAuthorizeeFromCourseRequest {
    userId: string,
    courseId: string
}