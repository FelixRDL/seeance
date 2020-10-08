import {User} from "../../entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {CourseRepository} from "../../repositories/CourseRepository";
import {ProjectRepository} from "../../repositories/ProjectRepository";
import {Course} from "../../entities/Course";

export async function DeleteUserById(req: DeleteUserByIdRequest,
                                     userRepository: UserRepository,
                                     courseRepository: CourseRepository,
                                     projectRepository: ProjectRepository
): Promise<void> {
    try {
        const courses: Course[] = await courseRepository.getCoursesForUser(req.authenticatedUser);
        await Promise.all(courses.map(async(course: Course) => {
            return Promise.all([projectRepository.removeAllProjectsForCourse(course._id),
            await courseRepository.removeCourseById(course._id)])
        }));
        await userRepository.deleteByUserId(req.authenticatedUser.id);
        return Promise.resolve();
    } catch(e) {
        console.error(e);
        return Promise.reject(e);
    }
}

export interface DeleteUserByIdRequest {
    authenticatedUser: User
}