import {UserRepository} from "../../repositories/UserRepository";
import {User} from "../../entities/User";
import {CourseRepository} from "../../repositories/CourseRepository";
import {Course} from "../../entities/Course";

export async function GetAuthorizedUsersForCourseWithId(
    req: GetAuthorizedUsersForCourseWithIdRequest,
    userRepository: UserRepository,
    courseRepository: CourseRepository
    ): Promise<User[]> {
    try {
        const course: Course = await courseRepository.getCourseById(req.courseId);
        return Promise.all(course.authorizeeIds.map(async (id: string) => {
            return userRepository.getUserWithId(id);
        }));
    } catch(e) {
        return Promise.reject(e);
    }
}

export interface GetAuthorizedUsersForCourseWithIdRequest {
    courseId: string;
}