import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {Course} from "../../entities/Course";
import {CourseRepository} from "../../repositories/CourseRepository";

export async function GetCourseById(courseId: string, user: User, repository: CourseRepository): Promise<Course> {
    try {
        const course: Course = await repository.getCourseById(courseId);
        if(!course) {
            return Promise.reject(new CourseNotExistingError());
        } else if((course.ownerId != user.id) && (!course.authorizeeIds.includes(user.id))) {
            // TODO: add further validation when other users can be authorized
            return Promise.reject(new UserNotAuthorizedAccessingCourseError())
        } else {
            return Promise.resolve(course);
        }
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

export class CourseNotExistingError extends Error {
    constructor() {
        super();
        this.message = "The course you are trying to access does not exist (yet).";
    }
}
export class UserNotAuthorizedAccessingCourseError extends Error {
    constructor() {
        super();
        this.message = "You are trying to access a course, that you are not authorized for.";
    }
}
