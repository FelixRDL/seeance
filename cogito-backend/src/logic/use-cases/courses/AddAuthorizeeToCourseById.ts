import {Project} from "../../entities/Project";
import {CourseRepository} from "../../repositories/CourseRepository";
import {Course} from "../../entities/Course";
import {InternalServerError} from "../../core/errors/InternalServerError";
import {RepoRepository} from "../../repositories/RepoRepository";
import {MethodNotImplementedError} from "../../core/errors/MethodNotImplementedError";
import {ProtoProjectToProjectMapper} from "../../repositories/mappers/ProtoProjectToProjectMapper";
import {ProjectRepository} from "../../repositories/ProjectRepository";
import {User} from "../../entities/User";

export async function AddAuthorizeeToCourseById(
    req: AddAuthorizeeToCourseByIdRequest,
    courseRepository: CourseRepository)
    : Promise<Course> {
    const course: Course = await courseRepository.getCourseById(req.courseId);
    if (course.authorizeeIds.includes(req.user.id)) {
        return Promise.reject(new UserAlreadyAuthorizedForCourseError())
    } else {
        return courseRepository.addUserToCourseAuthorizees(course, req.user);
    }
}

export interface AddAuthorizeeToCourseByIdRequest {
    courseId: string,
    user: User
}

export class UserAlreadyAuthorizedForCourseError extends Error {
    constructor() {
        super();
        this.message = "The course already contains this user as an authorizee";
    }
}