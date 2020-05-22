import {Project} from "../../entities/Project";
import {CourseRepository} from "../../repositories/CourseRepository";
import {Course} from "../../entities/Course";
import {InternalServerError} from "../../core/errors/InternalServerError";
import {User} from "../../entities/User";

export async function IsUserAuthorizedToAccessCourse (
    req: IsUserAuthorizedToAccessCourseRequest,
    courseRepository: CourseRepository): Promise<boolean> {
    try {
        const course: Course = await courseRepository.getCourseById(req.id);
        return Promise.resolve((course.ownerId == req.user.id) || (course.authorizeeIds.includes(req.user.id)));
    } catch(e) {
        console.error(e);
        return Promise.reject(new InternalServerError());
    }
}

export interface IsUserAuthorizedToAccessCourseRequest {
    id: string,
    user: User
}