import {CourseRepository} from "../../repositories/CourseRepository";
import {Course} from "../../entities/Course";
import {UserAlreadyAuthorizedForCourseError} from "./AddAuthorizeeToCourseById";

export async function RemoveAuthorizeeFromCourse (
    req: RemoveAuthorizeeFromCourseRequest,
    courseRepository: CourseRepository)
    : Promise<void> {
    try {
        const course: Course = await courseRepository.getCourseById(req.courseId);
        if(req.userId == course.ownerId || !course.authorizeeIds.includes(req.userId)) {
            return Promise.reject(new UserNotAuthorizedForCourseError())
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

export class UserNotAuthorizedForCourseError extends Error {
    constructor() {
        super();
        this.message = "The user you want to remove from the course is not authorized for it.";
    }
}